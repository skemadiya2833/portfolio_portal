import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, Tooltip, useDisclosure } from '@nextui-org/react'
import { CrossIcon } from '../icons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ProjectsType } from '@/types/ProjectsType';
import { addProjectRequest, resetProjectSuccess, removeProjectRequest, updateProjectRequest, updateProjectState } from '@/redux/slices/projectSlice';
import { toast } from 'react-toastify';
import { base64ToFile } from '@/util/base64ToFile';
import { ImageType } from '@/types/ImageType';
import { clearAllErrors, clearError } from '@/redux/slices/errorSlice';
import { updateResumeData } from '@/redux/slices/resumeSlice';
import { textEditorConfiguration } from '@/util/textEditorConfiguration';
import dynamic from 'next/dynamic';

export default function Projects() {

    const userState = useAppSelector(state => state.user);
    const projectState = useAppSelector(state => state.project);
    const error = useAppSelector(state => state.error);
    const [removeProjectIndex, setRemoveProjectIndex] = useState<number>(-1);
    const [updateProjectIndex, setUpdateProjectIndex] = useState<number>(-1);
    const [image, setImage] = useState<File | null>(null);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();
    const initialFormData = {
        name: "",
        briefDetail: ""
    };
    const [formData, setFormData] = useState(initialFormData);
    const editorRef = useRef(null);
    const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })
    const config = useMemo(
        () => textEditorConfiguration(300, 'Brief Detail'),
        [],
    );

    useEffect(() => {
        if (userState.success && !projectState.data) {
            dispatch(clearAllErrors());
            dispatch(updateProjectState(userState?.user?.projects ? userState.user.projects : []));
        }
    }, [dispatch, projectState.data, userState.success, userState.user?.projects])

    useEffect(() => {
        if (projectState.success) {
            dispatch(clearAllErrors());
            toast.success("Data Updated Successfully");
            dispatch(updateResumeData({ key: 'projects', value: projectState.data }));
        } else if (Object.keys(error).length) {
            toast.error(error.general);
            dispatch(clearError('general'));
        }
        dispatch(resetProjectSuccess());
    }, [dispatch, projectState.success, error, projectState.data])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
        let name = '', value = '';
        if (typeof event === 'string') {
            name = 'briefDetail';
            value = event;
        } else {
            name = event.target.name;
            value = event.target.value;
        }
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.briefDetail.trim().length === 0) {
            toast.error("Description should not be empty");
        } else if (updateProjectIndex === -1) {
            dispatch(addProjectRequest({ data: formData as ProjectsType, token: userState.token, image: image as File }))
        } else {
            dispatch(updateProjectRequest({ data: formData as ProjectsType, projectId: (projectState.data![updateProjectIndex].id), token: userState.token, image: image as File }))
        }
    }

    const handleRemove = (index: number) => {
        setRemoveProjectIndex(index);
        onOpen();
    }

    const removeProject = () => {
        dispatch(removeProjectRequest({ projectId: (projectState.data![removeProjectIndex].id), token: userState.token }));
        onClose();
    }

    const updateForm = (index: number) => {
        setFormData(projectState.data![index]);
        setImage(base64ToFile(projectState.data![index]?.image as ImageType));
        setUpdateProjectIndex(index);
    }

    const cancelUpdate = () => {
        setFormData(initialFormData);
        setImage(null);
        setUpdateProjectIndex(-1);
    }

    return (
        <>
            <div className={styles['data-chips']}>
                {
                    projectState.data?.map((project, index) =>
                        <Chip key={index} className={`mb-2 ${styles['data-chip']}`}>
                            <span className='select-none' onDoubleClick={() => updateForm(index)}>{project.name}</span>
                            <button onClick={() => handleRemove(index)}><CrossIcon /></button>
                        </Chip>
                    )
                }
            </div>
            <Divider />
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Projects Form</h2>
                <Tooltip isDisabled={!error.name} className={error.name && styles['error-tooltip']} content={error.name}>
                    <input autoComplete='true' className={error.name ? styles['input-error'] : styles['input-normal']} name="name" type="text" placeholder="Name" maxLength={35} value={formData.name} onChange={handleChange} required></input>
                </Tooltip>
                <JoditEditor
                    className={error.description ? styles['input-error'] : styles['input-normal']}
                    ref={editorRef}
                    value={formData?.briefDetail ?? ''}
                    config={config}
                    onBlur={(htmlString) => handleChange(htmlString)}
                />
                <input id='image' type="file" name="image" accept="image/*" onChange={handleFileChange} hidden />
                <Tooltip isDisabled={!error.image} className={error.image && styles['error-tooltip']} content={error.image}>
                    <label htmlFor='image' className={`cursor-pointer ${error.image ? styles['input-error'] : styles['input-normal']}`}>Project Image  <small>(less than 1MB)</small>: <i>{image?.name}</i></label>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateProjectIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateProjectIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeProject}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
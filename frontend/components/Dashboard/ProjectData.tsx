import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Tooltip, Modal, ModalContent, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { CrossIcon } from "../icons";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { ImageType } from "@/types/ImageType";
import { base64ToFile } from "@/util/base64ToFile";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectDataType } from '@/types/ProjectDataType';
import { toast } from 'react-toastify';
import { addProjectDataRequest, fetchProjectDataRequest, resetProjectDataSuccess, removeProjectDataRequest, reorderProjectDataRequest, updateProjectDataRequest, updateProjectDataState } from '@/redux/slices/projectDataSlice';
import { clearAllErrors, clearError } from '@/redux/slices/errorSlice';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import dynamic from 'next/dynamic';
import { textEditorConfiguration } from '@/util/textEditorConfiguration';

export default function ProjectData() {

    const userState = useAppSelector(state => state.user);
    const projectState = useAppSelector(state => state.project);
    const projectDataState = useAppSelector(state => state.projectData);
    const error = useAppSelector(state => state.error);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [removeProjectDataIndex, setRemoveProjectDataIndex] = useState<number>(-1);
    const [updateProjectDataIndex, setUpdateProjectDataIndex] = useState<number>(-1);
    const [projects, _setProjects] = useState(projectState.data ? projectState.data : userState.user?.projects);
    const [projectData, setProjectData] = useState<ProjectDataType[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();
    const initialFormData = {
        heading: "",
        description: "",
        project: {
            id: ''
        }
    };
    const [formData, setFormData] = useState(initialFormData);
    const editorRef = useRef(null);
    const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })
    const config = useMemo(
        () => textEditorConfiguration(600, 'Description'),
        [],
    );

    useEffect(() => {
        dispatch(updateProjectDataState([]));
    }, [dispatch])

    useEffect(() => {
        if (projectDataState.success) {
            dispatch(clearAllErrors());
            toast.success("Data Updated Successfully");
            setProjectData(projectDataState.data);
        } else if (Object.keys(error).length) {
            toast.error(error.general);
            dispatch(updateProjectDataState(projectData));
            dispatch(clearError('general'));
        }
        dispatch(resetProjectDataSuccess());
    }, [dispatch, projectData, projectDataState.data, projectDataState.success, error])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | string) => {
        let name = '', value = '';
        if (typeof event === 'string') {
            name = 'description';
            value = event;
        } else {
            name = event.target.name;
            value = event.target.value;
        }
        if (name === 'project') {
            setSelectedProject(value);
            setUpdateProjectDataIndex(-1);
            setRemoveProjectDataIndex(-1);
            setFormData(initialFormData);
            setImage(null);
            setProjectData([]);
            if (value == '') {
                dispatch(updateProjectDataState([]));
            }
            else {
                dispatch(fetchProjectDataRequest({ projectId: value, token: userState.token }));
                setFormData((previousFromDataState) => ({ ...previousFromDataState, 'project': { 'id': value } }));
            }
        } else {
            setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedProject.length) {
            toast.error("Please select any project first !!");
        } else if (formData.description.trim().length === 0) {
            toast.error("Description should not be empty");
        }
        else if (updateProjectDataIndex !== -1) {
            dispatch(updateProjectDataRequest({ data: formData as ProjectDataType, projectDataId: projectDataState.data[updateProjectDataIndex].id, token: userState.token, image: image as File }))
        } else {
            dispatch(addProjectDataRequest({ data: formData as ProjectDataType, token: userState.token, image: image as File }))
        }
    }

    const handleRemove = (index: number) => {
        setRemoveProjectDataIndex(index);
        onOpen();
    }

    const removeProjectData = () => {
        dispatch(removeProjectDataRequest({ projectDataId: (projectDataState.data[removeProjectDataIndex].id), token: userState.token }));
        onClose();
    }

    const updateForm = (index: number) => {
        setFormData((previousFormDataState) => ({ ...previousFormDataState, ...(projectDataState.data[index]) }));
        setImage(base64ToFile(projectDataState.data[index].image as ImageType));
        setUpdateProjectDataIndex(index);
    }

    const cancelUpdate = () => {
        setFormData(initialFormData);
        setImage(null);
        setUpdateProjectDataIndex(-1);
    }

    const dragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(projectDataState.data);
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, reorderedItem);
        dispatch(updateProjectDataState(reorderedItems));
        dispatch(reorderProjectDataRequest({ data: { entityId: result.draggableId, superEntityId: formData.project.id, oldOrderNumber: result.source.index, newOrderNumber: result.destination.index }, token: userState.token ?? '' }))
    }

    return (
        <>
            <DragDropContext onDragEnd={dragEnd}>
                <Droppable droppableId="projectDataChips" direction="horizontal">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={styles['data-chips']}>
                            {
                                projectDataState.data.map((projectData, index) =>
                                    <Draggable key={projectData.id} draggableId={projectData.id.toString()} index={index}>
                                        {(provided) => (
                                            <Chip
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`${styles['data-chip']}`}>
                                                <span className='select-none' onDoubleClick={() => updateForm(index)}>{projectData.heading}</span>
                                                <button onClick={() => handleRemove(index)}><CrossIcon /></button>
                                            </Chip>
                                        )}
                                    </Draggable>
                                )
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Divider />
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Project Data Form</h2>
                <Select id='project' name='project' aria-label='Your Projects' items={projects ? projects : []} placeholder="Select your project" className={'p-5'} variant='bordered' onChange={handleChange}>
                    {(project) => <SelectItem key={project.id}>{project.name}</SelectItem>}
                </Select>
                <Tooltip isDisabled={!error.heading} className={error.heading && styles['error-tooltip']} content={error.heading}>
                    <input autoComplete='true' className={error.heading ? styles['input-error'] : styles['input-normal']} name="heading" type="text" placeholder="Heading" maxLength={35} value={formData.heading} onChange={handleChange} required></input>
                </Tooltip>
                <JoditEditor
                    className={error.description ? styles['input-error'] : styles['input-normal']}
                    ref={editorRef}
                    value={formData?.description ?? ''}
                    config={config}
                    onBlur={(htmlString) => handleChange(htmlString)}
                />
                <input id='image' type="file" name="image" accept="image/*" onChange={handleFileChange} hidden />
                <Tooltip isDisabled={!error.image} className={error.image && styles['error-tooltip']} content={error.image}>
                    <label htmlFor='image' className={`cursor-pointer ${error.image ? styles['input-error'] : styles['input-normal']}`}>Project Data Image  <small>(less than 1MB)</small>: <i>{image?.name}</i></label>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateProjectDataIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateProjectDataIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeProjectData}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
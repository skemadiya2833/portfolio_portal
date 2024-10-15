import styles from '@/styles/Dashboard.module.css'
import { CrossIcon } from '../icons'
import { Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, Select, SelectItem, Tooltip, useDisclosure } from '@nextui-org/react'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useEffect, useState } from 'react';
import { addSocialMediaRequest, removeSocialMediaRequest, resetSocialMediaSuccess, updateSocialMediaRequest, updateSocialMediaState } from '@/redux/slices/socialMediaSlice';
import { toast } from 'react-toastify';
import { clearAllErrors, clearError } from '@/redux/slices/errorSlice';
import { SocialMediaType } from '@/types/SocialMediaType';

export default function SocialMedia() {

    const userState = useAppSelector(state => state.user);
    const socialMediaState = useAppSelector(state => state.socialMedia);
    const error = useAppSelector(state => state.error);
    const dispatch = useAppDispatch();
    const [updateSocialMediaIndex, setUpdateSocialMediaIndex] = useState<number>(-1);
    const [removeSocialMediaIndex, setRemoveSocialMediaIndex] = useState<number>(-1);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const initialFormData = {
        name: '',
        url: ''
    };
    const [formData, setFormData] = useState(initialFormData);
    const socialMediaNames = [
        { key: 'Linkedin', label: 'Linkedin' },
        { key: 'Twitter', label: 'Twitter' },
        { key: 'Facebook', label: 'Facebook' },
        { key: 'Instagram', label: 'Instagram' },
        { key: 'Medium', label: 'Medium' },
        { key: 'YouTube', label: 'YouTube' },
        { key: 'Quora', label: 'Quora' },
        { key: 'Github', label: 'Github' },
        { key: 'Gitlab', label: 'Gitlab' }
    ]

    useEffect(() => {
        dispatch(clearAllErrors());
        if (userState.success && !socialMediaState.data) {
            dispatch(updateSocialMediaState(userState?.user?.socialMedias ? userState.user.socialMedias : []));
        }
    }, [dispatch, socialMediaState.data, userState.success, userState.user?.socialMedias])

    useEffect(() => {
        if (socialMediaState.success) {
            toast.success("Data Updated Successfully");
        } else if (Object.keys(error).length) {
            toast.error(error.general);
            dispatch(clearError('general'));
        }
        dispatch(resetSocialMediaSuccess());
    }, [dispatch, socialMediaState.success, error, socialMediaState.data])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (updateSocialMediaIndex === -1) {
            dispatch(addSocialMediaRequest({ data: formData as SocialMediaType, token: userState.token }))
        } else {
            dispatch(updateSocialMediaRequest({ data: formData as SocialMediaType, socialMediaId: (socialMediaState.data![updateSocialMediaIndex].id), token: userState.token }))
        }
    }

    const handleRemove = (index: number) => {
        setRemoveSocialMediaIndex(index);
        onOpen();
    }

    const updateForm = (index: number) => {
        setFormData(socialMediaState.data![index]);
        setUpdateSocialMediaIndex(index);
    }

    const cancelUpdate = () => {
        setUpdateSocialMediaIndex(-1);
        setFormData(formData);
    }

    const removeSocialMedia = () => {
        dispatch(removeSocialMediaRequest({ socialMediaId: (socialMediaState.data![removeSocialMediaIndex].id), token: userState.token }));
        onClose();
    }

    return (
        <>
            <div className={styles['data-chips']}>
                {
                    socialMediaState.data?.map((socialMedia, index) =>
                        <Chip key={index} className={`mb-2 ${styles['data-chip']}`}>
                            <span className='select-none' onDoubleClick={() => updateForm(index)}>{socialMedia.name}</span>
                            <button onClick={() => handleRemove(index)}><CrossIcon /></button>
                        </Chip>
                    )
                }
            </div>
            <Divider />
            <form className={styles['dashboard-form']} onSubmit={handleSubmit}>
                <h2>Social Media Form</h2>
                <Select id='name' name='name' aria-label='Social Media' items={socialMediaNames} placeholder="Select the social media" className={'p-5'} variant='bordered' onChange={handleChange}>
                    {(socialMediaName) => <SelectItem key={socialMediaName.key}>{socialMediaName.label}</SelectItem>}
                </Select>
                <Tooltip isDisabled={!error.url} className={error.url && styles['error-tooltip']} content={error.url}>
                    <input autoComplete='true' className={error.url ? styles['input-error'] : styles['input-normal']} name='url' type='url' placeholder='Social Media URL' maxLength={255} value={formData.url} onChange={handleChange} required></input>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateSocialMediaIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateSocialMediaIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeSocialMedia}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
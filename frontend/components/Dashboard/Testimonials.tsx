import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, Tooltip, useDisclosure } from "@nextui-org/react";
import { CrossIcon } from "../icons";
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { addTestimonialRequest, removeTestimonialRequest, resetTestimonialSuccess, updateTestimonialRequest, updateTestimonialState } from '@/redux/slices/testimonialSlice';
import { clearAllErrors, clearError } from '@/redux/slices/errorSlice';
import { toast } from 'react-toastify';
import { TestimonialType } from '@/types/TestimonialType';
import { updateResumeData } from '@/redux/slices/resumeSlice';
import { textEditorConfiguration } from '@/util/textEditorConfiguration';
import dynamic from 'next/dynamic';

export default function Testimonials() {

    const userState = useAppSelector(state => state.user);
    const testimonialState = useAppSelector(state => state.testimonial);
    const error = useAppSelector(state => state.error);
    const dispatch = useAppDispatch();
    const [removeTestimonialIndex, setRemoveTestimonialIndex] = useState<number>(-1);
    const [updateTestimonialIndex, setUpdateTestimonialIndex] = useState<number>(-1);
    const [tooltipOpen, _isTooltipOpen] = useState<boolean>(false);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const initialFormData = {
        name: "",
        designation: "",
        description: "",
        rating: 0
    };
    const [formData, setFormData] = useState(initialFormData);
    const editorRef = useRef(null);
    const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })
    const config = useMemo(
        () => textEditorConfiguration(400, 'Description'),
        [],
    );

    useEffect(() => {
        dispatch(clearAllErrors());
        if (userState.success && !testimonialState.data) {
            dispatch(updateTestimonialState(userState?.user?.testimonials ? userState.user.testimonials : []));
        }
    }, [dispatch, testimonialState.data, userState.success, userState.user?.testimonials])

    useEffect(() => {
        if (testimonialState.success) {
            toast.success("Data Updated Successfully");
            dispatch(updateResumeData({ key: 'testimonials', value: testimonialState.data }))
        } else if (Object.keys(error).length) {
            toast.error(error.general);
            dispatch(clearError('general'));
        }
        dispatch(resetTestimonialSuccess());
    }, [dispatch,testimonialState.success, error, testimonialState.data])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
        let name = '', value = '';
        if (typeof event === 'string') {
            name = 'description';
            value = event;
        } else {
            name = event.target.name;
            value = event.target.value;
        }
        setFormData((previousFormData) => ({ ...previousFormData, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.description.trim().length === 0) {
            toast.error("Description should not be empty");
        } else if (updateTestimonialIndex === -1) {
            dispatch(addTestimonialRequest({ data: formData as TestimonialType, token: userState.token }))
        } else {
            dispatch(updateTestimonialRequest({ data: formData as TestimonialType, testimonialId: (testimonialState.data![updateTestimonialIndex].id), token: userState.token }))
        }
    }

    const handleRemove = (index: number) => {
        setRemoveTestimonialIndex(index);
        onOpen();
    }

    const removeTestimonial = () => {
        dispatch(removeTestimonialRequest({ testimonialId: (testimonialState.data![removeTestimonialIndex].id), token: userState.token }));
        onClose();
    }

    const updateForm = (index: number) => {
        setFormData(testimonialState.data![index]);
        setUpdateTestimonialIndex(index);
    }

    const cancelUpdate = () => {
        setFormData(initialFormData);
        setUpdateTestimonialIndex(-1);
    }

    return (
        <>
            <div className={styles['data-chips']}>
                {
                    testimonialState.data?.map((testimonial, index) =>
                        <Chip key={index} className={`mb-2 ${styles['data-chip']}`}>
                            <span className='select-none' onDoubleClick={() => updateForm(index)}>{testimonial.name}</span>
                            <button onClick={() => handleRemove(index)}><CrossIcon /></button>
                        </Chip>
                    )
                }
            </div>
            <Divider />
            <form className={styles['dashboard-form']} onSubmit={handleSubmit}>
                <h2>Testimonial Form</h2>
                <Tooltip isDisabled={!error.name} isOpen={tooltipOpen} className={error.name && styles['error-tooltip']} content={error.name}>
                    <input autoComplete='true' className={error.name ? styles['input-error'] : styles['input-normal']} name='name' type='text' placeholder='Name' maxLength={35} value={formData.name} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip className={error.designation && styles['error-tooltip']} content={error.designation}>
                    <input autoComplete='true' className={error.designation ? styles['input-error'] : styles['input-normal']} name='designation' type='text' placeholder='Designation' maxLength={35} value={formData.designation} onChange={handleChange} required></input>
                </Tooltip>
                <JoditEditor
                    className={error.description ? styles['input-error'] : styles['input-normal']}
                    ref={editorRef}
                    value={formData?.description ?? ''}
                    config={config}
                    onBlur={(htmlString) => handleChange(htmlString)}
                />
                <Tooltip className={error.rating && styles['error-tooltip']} content={error.rating}>
                    <input className={error.rating ? styles['input-error'] : styles['input-normal']} name='rating' type='number' placeholder='Rating(Optional)' min={0} max={5} value={formData.rating ? formData.rating : undefined} onChange={handleChange}></input>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateTestimonialIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateTestimonialIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeTestimonial}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { resetContactSuccess, saveContactRequest, updateContactRequest, updateContactState } from '@/redux/slices/contactSlice'
import { clearAllErrors, clearError } from '@/redux/slices/errorSlice'
import { updateResumeData } from '@/redux/slices/resumeSlice'
import styles from '@/styles/Dashboard.module.css'
import { ContactType } from '@/types/ContactType'
import { Divider, Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Contact() {

    const userState = useAppSelector(state => state.user);
    const contactState = useAppSelector(state => state.contact);
    const error = useAppSelector(state => state.error);
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<ContactType>({
        id: '',
        emailId: '',
        address: '',
        phoneNo: ''
    })
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);

    useEffect(() => {
        dispatch(clearAllErrors());
        if (userState.success) {
            if (!contactState.data) {
                if (userState.user?.contact) {
                    dispatch(updateContactState(userState.user.contact));
                    setIsDataPresent(true)
                    setFormData(userState.user.contact)
                } else {
                    setFormData((previousFormDataState) => ({ ...previousFormDataState, 'emailId': userState.user?.emailId ?? '' }))
                }
            } else {
                setFormData(contactState.data);
                setIsDataPresent(true);
            }
        }
    }, [dispatch, userState.success, contactState.data, userState.user?.contact, userState.user?.emailId])

    useEffect(() => {
        if (contactState.success) {
            toast.success('Data updated Successfully');
            dispatch(clearAllErrors());
            setFormData((previousFormData) => contactState.data ?? previousFormData);
            setIsDataPresent(true);
            dispatch(updateResumeData({ key: 'contact', value: contactState.data }));
        } else if (Object.keys(error).length) {
            toast.error(error.general);
            dispatch(clearError('general'));
        }
        dispatch(resetContactSuccess())
    }, [dispatch, contactState.success, error, contactState.data]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isDataPresent) {
            dispatch(updateContactRequest({ data: formData, contactId: formData.id, token: userState.token! }));
        }
        else {
            dispatch(saveContactRequest({ data: formData, token: userState.token! }));
        }
    }

    return (
        <>
            <div className={styles['data-chips']}>
            </div>
            <Divider />
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Contact Form</h2>
                <Tooltip isDisabled={!error.emailId} className={error.emailId && styles['error-tooltip']} content={error.emailId}>
                    <input autoComplete='true' className={error.emailId ? styles['input-error'] : styles['input-normal']} name="emailId" type="email" placeholder="Email Id" maxLength={35} value={formData?.emailId} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip isDisabled={!error.address} className={error.address && styles['error-tooltip']} content={error.address}>
                    <textarea autoComplete='true' className={error.address ? styles['input-error'] : styles['input-normal']} name="address" rows={5} placeholder="Address" maxLength={255} value={formData?.address} onChange={handleChange} required></textarea>
                </Tooltip>
                <Tooltip isDisabled={!error.phoneNo} className={error.phoneNo && styles['error-tooltip']} content={error.phoneNo}>
                    <input autoComplete='true' className={error.phoneNo ? styles['input-error'] : styles['input-normal']} name="phoneNo" type="tel" pattern='^[6-9]\d{9}$' placeholder="Mobile No" maxLength={10} value={formData?.phoneNo} onChange={handleChange} title={!error.phoneNo ? 'Invalid Mobile Number' : undefined} required></input>
                </Tooltip>
                <button type="submit" className={styles['submit-button']}> {isDataPresent ? 'Update' : 'Save'} </button>
            </form>
        </>
    )
}
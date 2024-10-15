import { registerUserFailure, registerUserRequest } from '@/redux/slices/registerSlice';
import styles from '@/styles/Dashboard.module.css'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CorrectIcon } from '../icons';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toast } from 'react-toastify';

export default function Register() {

    const registerState = useAppSelector(state => state.register);
    const error = useAppSelector(state => state.error);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordMismatch, setPasswordMismatch] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (registerState.success) {
            onOpen();
        } else if (Object.keys(error).length) {
            dispatch(registerUserFailure());
            toast.error(error.general);
        }
    }, [dispatch, registerState.success, error, onOpen]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => {
            if (name === 'confirmPassword' || name === 'password') {
                if (previousFormDataState.password !== value && previousFormDataState.confirmPassword !== value) {
                    setPasswordMismatch("Passwords do not match");
                } else {
                    setPasswordMismatch(undefined);
                }
            }
            return ({
                ...previousFormDataState,
                [name]: value,
            })
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMismatch("Passwords do not match");
        }
        else {
            setPasswordMismatch(undefined);
            dispatch(registerUserRequest(formData))
        };
    };

    return (
        <>
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Welcome Aboard! Let’s Get You Registered</h2>
                <Tooltip isDisabled={!error.firstName} className={error.firstName && styles['error-tooltip']} content={error.firstName}>
                    <input name="firstName" type="text" placeholder="First Name *" maxLength={17} value={formData.firstName} onChange={handleChange} className={error.firstName ? styles["input-error"] : styles["input-normal"]} required/>
                </Tooltip>
                <Tooltip isDisabled={!error.lastName} className={error.lastName && styles['error-tooltip']} content={error.lastName}>
                    <input name="lastName" type="text" placeholder="Last Name" maxLength={17} value={formData.lastName} onChange={handleChange} className={error.lastName ? styles["input-error"] : styles["input-normal"]} />
                </Tooltip>
                <Tooltip isDisabled={!error.emailId} className={error.emailId && styles['error-tooltip']} content={error.emailId}>
                    <input name="emailId" type="email" placeholder="Email Id *" maxLength={35} value={formData.emailId} onChange={handleChange} className={error.emailId ? styles["input-error"] : styles["input-normal"]} required/>
                </Tooltip>
                <Tooltip isDisabled={!error.username} className={error.username && styles['error-tooltip']} content={error.username}>
                    <input name="username" type="text" placeholder="Username *" minLength={6} maxLength={16} value={formData.username} onChange={handleChange} className={error.username ? styles["input-error"] : styles["input-normal"]} required/>
                </Tooltip>
                <Tooltip isDisabled={!error.password} className={error.password && styles['error-tooltip']} content={error.password}>
                    <input name="password" type="password" placeholder="Password *" minLength={8} maxLength={20} value={formData.password} onChange={handleChange} className={error.password ? styles["input-error"] : styles["input-normal"]} required/>
                </Tooltip>
                <Tooltip isDisabled={!passwordMismatch} className={passwordMismatch && styles['error-tooltip']} content={passwordMismatch}>
                    <input name="confirmPassword" type="password" placeholder="Confirm Password *" minLength={8} maxLength={20} value={formData.confirmPassword} onChange={handleChange} className={passwordMismatch ? styles["input-error"] : styles["input-normal"]} required/>
                </Tooltip>
                <button type="submit" disabled={registerState.success && !isOpen} className={styles['submit-button']}>Register</button>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={styles['registered-modal']}>
                <ModalContent>
                    <ModalHeader>Registered Successfully</ModalHeader>
                    <ModalBody className={styles['modal-body-content']}>
                        <CorrectIcon />
                        <p>Congratulations! You have been registered successfully.</p>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={() => router.push('/login')} className={styles["modal-button"]}>Go to Login Page</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
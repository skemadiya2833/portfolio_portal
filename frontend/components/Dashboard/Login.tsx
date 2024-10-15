import styles from '@/styles/Dashboard.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import portfolioImage from '@/public/portfolio.png'
import { useRouter } from 'next/router';
import { authUserFailure, loginUserRequest } from '@/redux/slices/authSlice';
import { LoginUserPayload } from '@/types/LoginUserPayload';
import { LoginResponseData } from '@/types/LoginResponseData';
import Loader from './Loader';
import { setLoading } from '@/redux/slices/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { toast } from 'react-toastify';
import { clearAllErrors } from '@/redux/slices/errorSlice';

export default function Login() {

    const loginState = useAppSelector(state => state.login);
    const error = useAppSelector(state => state.error);
    const loading = useAppSelector(state => state.loading)
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState<LoginUserPayload>({
        loginId: '',
        password: ''
    })

    useEffect(() => {
        localStorage.clear();
        dispatch(setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        if (loginState.success && loginState.data) {
            dispatch(clearAllErrors());
            const responseData = loginState.data as LoginResponseData;
            localStorage.setItem('data', JSON.stringify(responseData));
            router.push('/dashboard');
        }
        if (Object.keys(error).length) {
            dispatch(setLoading(false));
            dispatch(authUserFailure());
            toast.error(error.general);
        }
    }, [dispatch, loginState.success, loginState.data, router, error])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(clearAllErrors());
        dispatch(setLoading(true));
        dispatch(loginUserRequest(formData));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    return (
        <section className={`${styles['login-page']} ${loading && styles['overlay']}`}>
            {loading && (
                <Loader />
            )}
            <div className={styles['login-page-image']}>
                <Image priority={true} src={portfolioImage} alt='portfolioImage'></Image>
            </div>
            <div className={styles['login-page-form']}>
                <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                    <h2>Welcome Back!!</h2>
                    <input name="loginId" className={styles['input-normal']} type="text" placeholder="Email Id or Username *" value={formData.loginId} onChange={handleChange} required disabled={loading} />
                    <input autoComplete='true' name="password" className={styles['input-normal']} type="password" placeholder="Password *" value={formData.password} onChange={handleChange} required disabled={loading} />
                    <button type="submit" disabled={loading} className={styles['submit-button']}>Login</button>
                </form>
            </div>
        </section>
    )
}
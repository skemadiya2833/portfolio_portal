import styles from '@/styles/Home.module.css'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { ArrowDownIcon } from '../icons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { logoutUserRequest } from '@/redux/slices/authSlice';
import { useRouter } from 'next/router';
import { LoginResponseData } from '@/types/LoginResponseData';
import { updateUserData } from '@/redux/slices/fetchUserSlice';
import { updateSkillState } from '@/redux/slices/skillSlice';
import { updateProjectState } from '@/redux/slices/projectSlice';
import { updateSocialMediaState } from '@/redux/slices/socialMediaSlice';
import { updateTestimonialState } from '@/redux/slices/testimonialSlice';
import { useEffect, useState } from 'react';
import { updateProjectDataState } from '@/redux/slices/projectDataSlice';
import { updateAboutMeState } from '@/redux/slices/aboutMeSlice';
import { updateContactState } from '@/redux/slices/contactSlice';

export default function Header() {

    const initialUserData: LoginResponseData = {
        id: null,
        token: null,
        firstName: null,
        portfolioUrl: null
    }
    const userState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isDataPresent, setIsDataPresent] = useState(false);
    const [userData, setUserData] = useState<LoginResponseData>({
        id: null,
        token: null,
        firstName: null,
        portfolioUrl: null
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem('data');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData) as LoginResponseData;
                setUserData(parsedUserData);
                if (parsedUserData.token && parsedUserData.firstName && parsedUserData.portfolioUrl) {
                    setIsDataPresent(true);
                }
            } else {
                setIsDataPresent(false);
            }
        }
    }, []);

    const logoutUser = () => {
        dispatch(logoutUserRequest({ token: userData.token ? userData.token : '' }));
        localStorage.removeItem('data');
        setUserData({ id: null, token: null, firstName: null, portfolioUrl: null });
        dispatch(updateUserData(null));
        dispatch(updateAboutMeState(null));
        dispatch(updateSkillState(null));
        dispatch(updateProjectState(null));
        dispatch(updateProjectDataState([]));
        dispatch(updateTestimonialState(null));
        dispatch(updateContactState(null));
        dispatch(updateSocialMediaState(null));
        setIsDataPresent(false);
        router.push('/login');
    }

    return (
        <header className={styles['header']}>
            <Link className={styles['header-link']} href='/'>Home</Link>
            {
                isDataPresent ?
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className={styles['header-link']}> {userData.firstName}<ArrowDownIcon></ArrowDownIcon> </Button>
                        </DropdownTrigger>
                        <DropdownMenu className={styles['dropdown-menu']}>
                            <DropdownItem href='/dashboard' textValue='dashboard' key="dashboard" className={styles['header-link']}>Dashboard</DropdownItem>
                            <DropdownItem onClick={logoutUser} textValue='logout' key="logout" className={styles['header-link']}>Logout</DropdownItem>
                            <DropdownItem href={userData.portfolioUrl ? userData.portfolioUrl : ''} target='_blank' textValue='portfolioUrl' className={styles['header-link']}>Your Portfolio</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    <>
                        <Link className={styles['header-link']} href='/login'>Login</Link>
                        <Link className={styles['header-link']} href='/register'>Register</Link>
                    </>
            }
        </header>
    )
}
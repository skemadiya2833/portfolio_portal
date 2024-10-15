import styles from "@/styles/Portfolio.module.css"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PortfolioAboutMe from "./AboutMe";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import PortfolioTechnicalSkills from "./TechnicalSkills";
import PortfolioSoftSkills from "./SoftSkills";
import { useAppSelector } from "@/hooks/hooks";
import { SkillsType } from "@/types/SkillsType";
import PortfolioProjects from "./Projects";
import PortfolioProjectData from "./ProjectData";
import { fetchUserData } from "@/redux/slices/fetchUserSlice";
import PortfolioContact from "./Contact";
import PortfolioFooter from "./Footer";
import PortfolioTestimonials from "./Testimonials";


export default function PortfolioContainer() {

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const portfolioState = useAppSelector(state => state.user);
    const error = useAppSelector(state => state.error);
    const [technicalSkills, setTechnicalSkills] = useState<SkillsType[] | undefined>([]);
    const [softSkills, setSoftSkills] = useState<SkillsType[] | undefined>([]);
    const [projectPage, setProjectPage] = useState(false);

    useEffect(() => {
        if (router.query.user && !portfolioState.success) {
            if (router.query.user.length === 1) {
                dispatch(fetchUserData({ username: router.query.user[0], token: null }));
            } else if (router.query.user.length === 2) {
                setProjectPage(true);
            } else {
                router.push('/_error');
                return;
            }
        }
        if (Object.keys(error).length) {
            router.push('/_error');
            return;
        }
        if (portfolioState.success) {
            setTechnicalSkills(portfolioState.user?.skills.filter((skill) => skill.skillType === 'Technical'));
            setSoftSkills(portfolioState.user?.skills.filter((skill) => skill.skillType === 'Soft'));
        }
    }, [router, dispatch, portfolioState.user?.skills, router.isReady, router.query.user, error, portfolioState.success]);

    return (
        <main className={styles['portfolio-container']}>
            {
                projectPage ?
                    <PortfolioProjectData />
                    :
                    <>
                        {portfolioState.user?.aboutMe && <PortfolioAboutMe />}
                        {technicalSkills && technicalSkills?.length !== 0 && <PortfolioTechnicalSkills />}
                        {softSkills && softSkills?.length !== 0 && <PortfolioSoftSkills />}
                        {portfolioState && portfolioState.user?.projects?.length !== 0 && <PortfolioProjects />}
                        {portfolioState && portfolioState.user?.testimonials?.length !== 0 && <PortfolioTestimonials />}
                        {portfolioState && portfolioState.user?.contact && <PortfolioContact />}
                        {portfolioState && portfolioState.user?.socialMedias?.length !== 0 && <PortfolioFooter />}
                    </>
            }
        </main>
    )
}
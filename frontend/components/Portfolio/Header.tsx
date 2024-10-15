import React, { useEffect, useState } from "react";
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarContent, Link } from "@nextui-org/react";
import styles from "@/styles/Portfolio.module.css"
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/hooks";
import { SkillsType } from "@/types/SkillsType";

export default function PortfolioHeader() {

    const [queryLength, setQueryLength] = useState<number>(1);
    const portfolioState = useAppSelector(state => state.user);
    const router = useRouter();
    const [menuItems, setMenuItems] = useState<{ name: string, id: string, dataAbsent: boolean }[]>([]);
    const [activeSectionIndex, setActiveSectionIndex] = useState<number>(-1);

    useEffect(() => {
        if (portfolioState.success) {
            const technicalSkills: SkillsType[] | undefined = portfolioState.user?.skills.filter((skill) => skill.skillType === 'Technical');
            const softSkills: SkillsType[] | undefined = portfolioState.user?.skills.filter((skill) => skill.skillType === 'Soft');
            setMenuItems([
                {
                    name: "About Me",
                    id: "aboutMe",
                    dataAbsent: !portfolioState.user?.aboutMe
                },
                {
                    name: "Technical Skills",
                    id: "technicalSkills",
                    dataAbsent: !technicalSkills || !technicalSkills.length
                },
                {
                    name: "Soft Skills",
                    id: "softSkills",
                    dataAbsent: !softSkills || !softSkills.length
                },
                {
                    name: "Projects",
                    id: "projects",
                    dataAbsent: !portfolioState.user?.projects || !portfolioState.user?.projects.length
                },
                {
                    name: "Testimonials",
                    id: "testimonials",
                    dataAbsent: !portfolioState.user?.testimonials || !portfolioState.user?.testimonials.length
                },
                {
                    name: "Contact",
                    id: "contact",
                    dataAbsent: !portfolioState.user?.contact
                },
            ]);
        }
    }, [portfolioState.success, portfolioState.user?.aboutMe, portfolioState.user?.contact, portfolioState.user?.projects, portfolioState.user?.skills, portfolioState.user?.testimonials])

    useEffect(() => {
        if (router.query.user) setQueryLength(router.query.user.length);
    }, [router.query.user])

    return (
        <Navbar isBordered className={styles['navbar']}>
            <NavbarContent className="md:hidden" justify="end">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className={`hidden md:flex ${styles['navbar-menu']}`} justify="end">
                {
                    queryLength === 2 ?
                        <button onClick={() => router.back()}>BACK</button>
                        :
                        menuItems.map((item, index) => (
                            !item.dataAbsent
                            &&
                            <Link className={activeSectionIndex === index ? styles['active-section'] : styles['navbar-content']} onClick={() => setActiveSectionIndex(index)} key={index} href={`#${item.id}`}>
                                {item.name}
                            </Link>
                        ))
                }
            </NavbarContent>

            <NavbarMenu className={styles['navbar-menu']}>
                {
                    queryLength === 2 ?
                        <button onClick={() => router.back()}>BACK</button>
                        :
                        menuItems.map((item, index) => (
                            !item.dataAbsent
                            &&
                            <Link className={activeSectionIndex === index ? styles['active-section'] : styles['navbar-content']} onClick={() => setActiveSectionIndex(index)} key={index} href={`#${item.id}`}>
                                {item.name}
                            </Link>
                        ))}
            </NavbarMenu>
        </Navbar>
    );
}
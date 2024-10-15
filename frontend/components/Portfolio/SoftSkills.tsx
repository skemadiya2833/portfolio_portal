import { useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/Portfolio.module.css"
import { SkillsType } from "@/types/SkillsType";
import { Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react"
import { useState, useEffect } from "react";
import Carousel from "./Carousel";

export default function PortfolioSoftSkills() {

    const portfolioState = useAppSelector(state => state.user);
    const [softSkills, setSoftSkills] = useState<SkillsType[]>([]);

    useEffect(() => {
        if (portfolioState.success) {
            setSoftSkills(portfolioState.user ? portfolioState.user.skills.filter((skill) => skill.skillType === 'Soft') : []);
        }
    }, [portfolioState.success, portfolioState.user])

    return (
        <section id="softSkills" className={styles['soft-skills']}>
            <h1>Soft Skills</h1>
            <Carousel>
                {
                    softSkills.map((softSkill, index) =>
                        <Card key={index} className={styles['common-card']}>
                            <CardHeader>
                                <h3>{softSkill.name}</h3>
                            </CardHeader>
                            <Tooltip className='w-96 break-all shadow-sm shadow-secondary' content={<span dangerouslySetInnerHTML={{ __html: softSkill?.description ?? "" }}>
                            </span>}>
                                <CardBody className={`${styles['card-body']}`} dangerouslySetInnerHTML={{ __html: softSkill?.description ?? "" }}>
                                </CardBody>
                            </Tooltip>
                        </Card>
                    )
                }
            </Carousel>
        </section>
    )
}
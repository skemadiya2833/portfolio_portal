import { useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/Portfolio.module.css"
import { SkillsType } from "@/types/SkillsType";
import { Card, CardBody, CardFooter, CardHeader, CircularProgress, Progress, Tooltip } from "@nextui-org/react"
import { useEffect, useState } from "react";
import Carousel from "./Carousel";

export default function PortfolioTechnicalSkills() {

    const portfolioState = useAppSelector((state) => state.user);
    const [technicalSkills, setTechnicalSkills] = useState<SkillsType[]>([]);

    useEffect(() => {
        if (portfolioState.success) {
            setTechnicalSkills(portfolioState.user ? portfolioState.user.skills.filter((skill) => skill.skillType === 'Technical') : []);
        }
    }, [portfolioState.success, portfolioState.user])

    return (
        <section id="technicalSkills" className={styles['technical-skills']}>
            <h1>Technical Skills</h1>
            <Carousel>
                {
                    technicalSkills.map((technicalSkill, index) =>
                        <Card key={index} className={`${styles['common-card']}`}>
                            <CardHeader>
                                <h3>{technicalSkill.name}</h3>
                            </CardHeader>
                            <Tooltip className='w-96 break-all shadow-sm shadow-secondary' content={<span dangerouslySetInnerHTML={{ __html: technicalSkill?.description ?? "" }}>
                            </span>}>
                                <CardBody className={`${styles['card-body']}`} dangerouslySetInnerHTML={{ __html: technicalSkill?.description ?? "" }}>
                                </CardBody>
                            </Tooltip>
                            <CardFooter className={`justify-center ${styles['card-footer']}`}>
                                <CircularProgress classNames={{
                                    svg: "w-36 h-36 drop-shadow-md",
                                    indicator: "stroke-secondary",
                                    track: "stroke-secondary/10",
                                    value: "text-3xl font-semibold text-black",
                                }}
                                    label="Proficiency"
                                    value={technicalSkill.proficiency}
                                    color="success"
                                    showValueLabel={true}
                                />
                            </CardFooter>
                        </Card>
                    )
                }
            </Carousel>
        </section>
    )
}
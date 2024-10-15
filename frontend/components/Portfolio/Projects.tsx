import styles from "@/styles/Portfolio.module.css"
import Carousel from "./Carousel"
import { Card, CardBody, CardFooter, CardHeader, Image, Link, Tooltip } from "@nextui-org/react"
import { ProjectsType } from "@/types/ProjectsType";
import { useAppSelector } from "@/hooks/hooks";
import { useState, useEffect } from "react";
import { ImageType } from "@/types/ImageType";

export default function PortfolioProjects() {

    const portfolioState = useAppSelector(state => state.user);
    const [projects, setProjects] = useState<ProjectsType[]>([]);
    useEffect(() => {
        if (portfolioState.success) {
            setProjects(portfolioState.user ? portfolioState.user.projects : []);
        }
    }, [portfolioState.success, portfolioState.user])

    return (
        <section id="projects" className={styles['projects']}>
            <h1>My Projects</h1>
            <Carousel>
                {
                    projects.map((project, index) =>
                        <Card key={index} className={`${styles['common-card']}`}>
                            <div className="flex justify-center">
                                <Image src={`data:${(project?.image as ImageType)?.type};base64,${(project?.image as ImageType)?.imageData}`} alt="project image" className="w-full h-56 object-contain rounded-none"></Image>
                            </div>
                            <CardHeader>
                                <h3>{project.name}</h3>
                            </CardHeader>
                            <Tooltip className='w-96 break-all shadow-sm shadow-secondary' content={<span dangerouslySetInnerHTML={{ __html: project?.briefDetail ?? "" }}>
                            </span>}>
                                <CardBody className={`${styles['card-body']}`} dangerouslySetInnerHTML={{ __html: project?.briefDetail ?? "" }}>
                                </CardBody>
                            </Tooltip>
                            <CardFooter className="m-0 p-0 ps-2">
                                <Link className="m-0 p-2 rounded-xl bg-secondary text-white" href={portfolioState.user?.username + "/" + project.id}>Learn More</Link>
                            </CardFooter>
                        </Card>
                    )
                }
            </Carousel >
        </section >
    )
}
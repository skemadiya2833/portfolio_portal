import styles from "@/styles/Portfolio.module.css"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProjectDataRequest } from "@/redux/slices/projectDataSlice";
import { ImageType } from "@/types/ImageType";
import Image from "next/image";

export default function PortfolioProjectData() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const projectDataState = useAppSelector(state => state.projectData);
    const error = useAppSelector(state => state.error);

    useEffect(() => {
        console.log("Project Data : ",projectDataState.data);
        if (router.query.user && !projectDataState.success) {
            const username = router.query.user[0];
            const projectId = router.query.user[1];
            dispatch(fetchProjectDataRequest({ username: username, projectId: projectId, token: null }));
        }
    }, [projectDataState, error, router.query.user, dispatch])

    return (
        <section className={styles['project-data']}>
            <h1>{projectDataState.projectName}</h1>
            {
                projectDataState.data.map((projectData, index) =>
                    <div key={index} className={index % 2 === 0 ? styles['slide-left'] : styles['slide-right']}>
                        <div className={styles['project-data-image']}>
                            <Image alt="Project Data Image" src={`data:${(projectData.image as ImageType)?.type};base64,${(projectData?.image as ImageType)?.imageData}`}></Image>
                        </div>
                        <div className={styles['project-details']}>
                            <h3>{projectData.heading}</h3>
                            <p dangerouslySetInnerHTML={{ __html: projectData?.description ?? "" }}></p>
                        </div>
                    </div>
                )
            }
        </section>
    )
}
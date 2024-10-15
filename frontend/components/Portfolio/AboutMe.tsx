import styles from "@/styles/Portfolio.module.css"
import { Chip } from "@nextui-org/react"
import { AboutMeType } from "@/types/AboutMeType";
import { useEffect, useState } from "react";
import { ImageType } from "@/types/ImageType";
import { useAppSelector } from "@/hooks/hooks";
import Image from "next/image";

export default function PortfolioAboutMe() {

    const portfolioState = useAppSelector(state => state.user);
    const [aboutMe, setAboutMe] = useState<AboutMeType | null | undefined>(null);
    const [skillsArray, setSkillsArray] = useState<string[]>();

    useEffect(() => {
        if (portfolioState.success) {
            setAboutMe(portfolioState.user?.aboutMe);
            if (aboutMe?.skills) {
                setSkillsArray(aboutMe.skills.split(','));
            }
        }
    }, [portfolioState.success, aboutMe, portfolioState.user?.aboutMe])

    return (
        <section id="aboutMe" className={styles['about-me']}>
            <div className={styles['user-detail']}>
                <h1>I&apos;m {aboutMe?.name}</h1>
                <p className="break-words" dangerouslySetInnerHTML={{ __html: aboutMe?.description ?? "" }}></p>
                <div className={styles['data-chips']}>
                    {skillsArray &&
                        skillsArray?.map((skill, index) =>
                            <Chip key={index} className="mr-5 mt-5">{skill.trim()}</Chip>
                        )
                    }
                </div>
            </div>
            <div className={styles['user-image']}>
                <Image src={`data:${(aboutMe?.image as ImageType)?.type};base64,${(aboutMe?.image as ImageType)?.imageData}`} alt="user image"></Image>
            </div>
        </section>
    )
}
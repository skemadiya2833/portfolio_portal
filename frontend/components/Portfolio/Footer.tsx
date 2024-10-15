import styles from "@/styles/Portfolio.module.css"
import dynamic from "next/dynamic"
import { useAppSelector } from "@/hooks/hooks"
import { useEffect, useState } from "react";
import { SocialMediaType } from "@/types/SocialMediaType";
import Link from "next/link";

export default function PortfolioFooter() {

    const portfolioState = useAppSelector(state => state.user);
    const [socialMedias, setSocialMedias] = useState<SocialMediaType[]>([]);
    const socialMediaIcons: Record<string, () => Promise<() => JSX.Element>> = {
        Linkedin: () => import("../icons").then(module => module.LinkedinIcon),
        Twitter: () => import("../icons").then(module => module.TwitterIcon),
        Facebook: () => import("../icons").then(module => module.FacebookIcon),
        Instagram: () => import("../icons").then(module => module.InstagramIcon),
        Medium: () => import("../icons").then(module => module.MediumIcon),
        YouTube: () => import("../icons").then(module => module.YoutubeIcon),
        Quora: () => import("../icons").then(module => module.QuoraIcon),
        Github: () => import("../icons").then(module => module.GithubIcon),
        Gitlab: () => import("../icons").then(module => module.GitlabIcon)
    }

    useEffect(() => {
        if (portfolioState.success) {
            setSocialMedias(portfolioState.user ? portfolioState.user.socialMedias : []);
        }
    }, [portfolioState.success, portfolioState.user])

    return (
        <section className={styles['footer']}>
            {
                socialMedias.map((socialMedia, index) => {
                    const SocialMediaIcon = dynamic(socialMediaIcons[socialMedia.name]);
                    return (
                        <Link key={index} target="_blank" href={socialMedia.url}>
                            <SocialMediaIcon />
                        </Link>
                    )
                })
            }
        </section>
    )
}
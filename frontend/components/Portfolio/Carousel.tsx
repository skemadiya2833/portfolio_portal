import ReactElasticCarousel from "@itseasy21/react-elastic-carousel";
import React from "react";
import styles from "@/styles/Portfolio.module.css"

export default function Carousel({ children }: { children: React.ReactNode }) {
    const breakPoints = [
        { width: 550, itemsToShow: 1 },
        { width: 768, itemsToShow: 2 },
        { width: 1024, itemsToShow: 3 }
    ];
    return (
        <ReactElasticCarousel isRTL={false} breakPoints={breakPoints} className={styles['carousel-wrapper']}>
            {children}
        </ReactElasticCarousel>
    )
}

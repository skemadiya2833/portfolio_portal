import styles from "@/styles/Portfolio.module.css"
import { BlockquoteIcon, StarIcon } from "../icons"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TestimonialType } from "@/types/TestimonialType";
import { useAppSelector } from "@/hooks/hooks";

export default function PortfolioTestimonials() {

    const portfolioState = useAppSelector(state => state.user);
    const [testimonials, setTestimonials] = useState<TestimonialType[]>([])
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (portfolioState.success) {
            setTestimonials(portfolioState.user ? portfolioState.user.testimonials : []);
        }
    }, [portfolioState.success, portfolioState.user])

    useEffect(() => {
        if (testimonials.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    return prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1
                }
                );
            }, 7000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, testimonials]);

    return (
        <section id='testimonials' className={styles['testimonials']}>
            <h1>Testimonials</h1>
            <div className={styles['quotes']}>
                <AnimatePresence mode="wait">
                    <motion.blockquote
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className={styles['quote']}
                    >
                        <BlockquoteIcon />
                        <p dangerouslySetInnerHTML={{ __html: testimonials[currentIndex]?.description ?? "" }}></p>
                        <cite>
                            <div className="flex justify-end">
                                {
                                    Array.from(Array(testimonials[currentIndex]?.rating), (_rating, index) =>
                                        <StarIcon key={index} />
                                    )
                                }
                            </div>
                            <b>-{testimonials[currentIndex]?.name}</b>
                            <p className="text-sm">{testimonials[currentIndex]?.designation}</p>
                        </cite>
                    </motion.blockquote>
                </AnimatePresence>
            </div>
        </section>
    )
}
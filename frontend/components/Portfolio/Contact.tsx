import styles from "@/styles/Portfolio.module.css"
import { AddressIcon, EmailIcon, MobileIcon } from "../icons"
import Link from "next/link"
import { useAppSelector } from "@/hooks/hooks";
import { ContactType } from "@/types/ContactType";
import { useEffect, useState } from "react";

export default function PortfolioContact() {

    const portfolioState = useAppSelector(state => state.user);
    const [contact, setContact] = useState<ContactType | undefined>(undefined);

    useEffect(() => {
        if (portfolioState.success) {
            setContact(portfolioState.user?.contact);
        }
    }, [portfolioState.success, contact, portfolioState.user?.contact])

    return (
        <section id="contact" className={styles['contact-me']}>
            <h1>Contact Me</h1>
            <div className={styles['contact-details']}>
                <div>
                    <AddressIcon />
                    <address><Link target="_blank" href={`http://maps.google.com/?q=${contact?.address}`}>{contact?.address}</Link></address>
                </div>
                <div>
                    <MobileIcon />
                    <address><Link target="_blank" href={`tel:${contact?.phoneNo}`}>{contact?.phoneNo}</Link></address>
                </div>
                <div>
                    <EmailIcon />
                    <address><Link target="_blank" href={`mailto:${contact?.emailId}`}>{contact?.emailId}</Link></address>
                </div>
            </div>
        </section >
    )
}
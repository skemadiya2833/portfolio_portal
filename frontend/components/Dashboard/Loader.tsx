import { Spinner } from "@nextui-org/react";
import styles from '@/styles/Dashboard.module.css'

export default function Loader() {
    return (
        <div className={styles['loader-container']}>
            <Spinner />
        </div>
    )
}
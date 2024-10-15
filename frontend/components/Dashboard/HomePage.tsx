import styles from '@/styles/Home.module.css'
export default function Home() {
    
    return (
        <section className={styles['home-page']}>
            <div className={styles['heading']}>
                <h1>Welcome to &nbsp;<span>Portfolio Joy</span></h1>
                <p>An interactive portfolio builder</p>
            </div>
        </section>
    )
}
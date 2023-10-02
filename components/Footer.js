import Link from "next/link";
import styles from "./Footer.module.css";
import { SiGithub } from "react-icons/si";

export default function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <span>notsokodya</span>
                    <span>
                        made with love &lt;3
                        <Link href="https://github.com/notsokodya/website">
                            <SiGithub/>
                        </Link>
                    </span>
                </div>
            </footer>
        </>
    )
}
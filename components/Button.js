import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({children, icon, href, className}) {
    return (
        <>
            <Link href={href} className={styles.button + (className ? ` ${className}` : "")}>
                {icon}
                {...children}
            </Link>
        </>
    )
}
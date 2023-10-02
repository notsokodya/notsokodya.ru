import Link from "next/link";
import Image from "next/image";
import Modal from "./Modal";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./NavBar.module.css";
import icon from "@/public/icon.png";

import { MdHome, MdViewInAr, MdPeopleAlt, MdEdit } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: <MdHome/>
    },
    {
        label: "Projects",
        href: "/projects",
        icon: <MdViewInAr/>
    },
    {
        label: "Blog",
        href: "/blog",
        icon: <MdEdit/>
    }
];

export default function NavBar() {
    const [open, setOpen] = useState(false);

    const pathname = useRouter().pathname;
    const navLinks = (
        <>
            {
                navItems.map( ({label, href, icon}) => {
                    const isActive = href != "/" ? pathname.startsWith(href) : pathname == href;
                    return <Link
                        className   = {isActive ? styles.navLink + " " + styles.active : styles.navLink}
                        href        = {href}
                        key         = {label}
                        onClick={() => setOpen(false)}
                    >{icon}{label}</Link>
                })
            }
        </>
    )

    return (
        <>
            <header className={styles.navbar}>
                <div className={styles.container}>
                    <Link href="/" className={styles.title}>
                        <Image src={icon} alt="Icon"/>
                        <span className={styles.notsokodya}>NotSo<span>Kodya</span></span>
                    </Link>

                    <span className={styles.links}>
                        {navLinks}
                    </span>

                    <button onClick={() => {setOpen(true)}} className={styles.hambuger}><AiOutlineMenu/></button>
                    <Modal className={styles.__modal} open={open} setOpen={setOpen}>
                        <div>
                            <Link href="/" className={styles.title} onClick={() => setOpen(false)}>
                                    <Image src={icon} alt="Icon"/>
                                    <span className={styles.notsokodya}>NotSo<span>Kodya</span></span>
                            </Link>
                            <div className={styles.links}>
                                {navLinks}
                            </div>
                        </div>
                    </Modal>
                </div>
            </header>
            <div className={styles.placeholder}/>
        </>
    )
}
import MainLayout from "@/components/MainLayout.js";
import Button from "@/components/Button";

import { MdConstruction, MdOutlineArrowBackIosNew } from "react-icons/md";
import styles from "@/styles/InDev.module.css";

export default function Page() {
    return (
        <>
            <div className={styles.fullPage}>
                <div className={styles.wrapper}>
                    <MdConstruction/>
                    <p className={styles.title}>In Development</p>
                    <Button href="/" icon={<MdOutlineArrowBackIosNew/>}>Back to Home</Button>
                </div>
            </div>
        </>
    )
}

Page.getLayout = function getLayout(page) {
	return (
		<MainLayout title="Projects" description="page is in development :33">
			{page}
		</MainLayout>
	)
};
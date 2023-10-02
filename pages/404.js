import MainLayout from "@/components/MainLayout.js";
import Image from "next/image";
import Button from "@/components/Button";

import styles from "@/styles/404.module.css";
import osaka from "../public/osaka.gif";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

export default function Page() {
    return (
        <>
            <div className={styles.page404}>
                <div className={styles.wrapper}>
                    <Image 
                        src = {osaka}
                        alt = "404 picture"
                        width = {300}
                        height = {300}
                    />
                    <div className={styles.sidewrapper}>
                        <h1>404</h1>
                        <p>i forgor wher page is ╮(￣ω￣;)╭</p>

                        <Button href="/" icon={<MdOutlineArrowBackIosNew/>}>Back to Home</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

Page.getLayout = function getLayout(page) {
	return (
		<MainLayout title="404" description="i forgor :(((">
			{page}
		</MainLayout>
	)
};
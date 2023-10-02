import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "./MainLayout.module.css";
import walk2 from "@/public/walk2.gif";


export default function MainLayout({children, title, description}) {
    const titleMeta = `${title ? title + " • " : ""}NotSoKodya`;

    return (
        <>
            <Head>
                <title>{titleMeta}</title>
                <meta name="title" content={titleMeta}/>
                <meta name="description" content={description}/>
                <meta name="theme-color" content="#c179d3"/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://notsokodya.ru"/>
                <meta property="og:title" content={titleMeta}/>
                <meta property="og:description" content={description}/>
                <meta property="og:image" content={walk2.src}/>
            </Head>

            <NavBar/>
            <main className={styles.content}>
                {children}
            </main>
            <Footer/>
        </>
    )
}
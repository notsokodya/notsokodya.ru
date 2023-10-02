import Head from "next/head";
import "@/styles/globals.css";

export default function App({Component, pageProps}) {
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link rel="favicon" href="/favicon.ico"/>
                <link rel="manifest" href="manifest.json"/>
            </Head>

            {getLayout(<Component {...pageProps}/>)}
        </>
    );
}
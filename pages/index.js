import MainLayout from "@/components/MainLayout";
import styles from "@/styles/Home.module.css";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import pfp from "@/public/pfp.jpg";
import shark from "@/public/icons/shark.svg";
import laptop from "@/public/icons/laptop.svg";
import moon from "@/public/icons/offline.svg";
import online from "@/public/icons/online.svg";
import map from "@/public/icons/map.svg";

import { MdOutlineArrowDropDown, MdContentCopy } from "react-icons/md";
import { HiExternalLink } from "react-icons/hi";
import { 
    SiTypescript,
    SiJavascript, 
    SiReact, 
    SiNextdotjs, 
    SiHtml5, 
    SiCss3, 
    SiLua, 
    SiCplusplus, 
    SiRust,

    SiDiscord,
	SiGithub,
	SiSteam,
	SiTwitter,
	SiYoutube
} from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";

function SocialLink({icon, title, href}) {
    return (
        <Link href={href} className={styles.socialLink}>
            <span>{icon && icon()}{title}</span>
            <HiExternalLink/>
        </Link>
    )
}

const phrases = [
    "the computa user", 
    (<>literally <Image src={shark} alt="shark" key="shark" width={24} height={24} className={styles.shark}/></>), 
    "silly sometimes",
    "funky",
    "she/her"
];
const icons = {
    shark: <Image src={shark} alt="shark" width={24} height={24}/>,
    coding: <Image src={laptop} alt="laptop" width={24} height={24}/>,
    walk: <Image src={map} alt="map" width={24} height={24}/>, 
    online: <Image src={online} alt="green circle" width={24} height={24}/>,
    offline: <Image src={moon} alt="moon" width={24} height={24}/>
};

export default function Page() {
    const [phrase, setPhrase] = useState("");
    const [localTime, setLocalTime] = useState("0:00 AM");
    const [statusText, setStatusText] = useState("loading...");
    const [statusIcon, setStatusIcon] = useState("shark");
    const [discordCopied, setDiscordCopied] = useState(false);
    useEffect(() => {
        setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
        setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString("en-US", "Europe/Moscow"));
        }, 1000);

        fetch("/api/status").then(res => res.json()).then(data => {
            if (data && data.status) {
                setStatusText(data.status);
                setStatusIcon(data.icon);
            } else {
                setStatusText("no status lmao");
            }
        });
    }, []);

    function discordCopy() {
        if ( !discordCopied ) {
            setDiscordCopied(true);
            setTimeout(() => {
                setDiscordCopied(false);
            }, 1500);
        }
    }

    return (
        <>
            <div className={styles.frontpage}>
                <div className={styles.wrapper}>
                    <Image
                        src = {pfp}
                        alt = "my pfp"
                        width = {300}
                        height = {300}
                    />
                    <div>
                        <h1 className={styles.notsokodya}>NotSo<span>Kodya</span></h1>
                        <h2>{phrase}</h2>
                        <h3>{icons[statusIcon]}{statusText}</h3>
                    </div>
                </div>
                <MdOutlineArrowDropDown className={styles.arrow}/>
            </div>
            <div className={styles.about + " " + styles.section}>
                <div className={styles.wrapper}>
                    <h1>About me</h1>
                    <p>
                        Hi ヽ(*・ω・)ﾉ, I&apos;m NotSoKodya, Kodya or just <Image src={shark} alt="shark"/><br/>
                        I&apos;m mental ill programmer with little art skills (￣▽￣)<br/>
                        I love breakcore, sweet food and coding<br/>
                        I can speak Russian and English languages<br/>
                        Its {localTime} for me and im probably online rn<br/>
                        So feel free to text me, I love talking ( = ⩊ = )
                    </p>
                </div>
            </div>
            <div className={styles.section + " " + styles.about}>
                <div className={styles.wrapper}>
                    <h1>Skills</h1>
                    <p>
                        So uh, about &quot;skills&quot;...<br/>
                        I know how to work with these things:
                    </p>
                    <ul className={styles.skills}>
                        <li><SiTypescript/>TypeScript</li>
                        <li><SiJavascript/>JavaScript</li>
                        <li><SiReact/>React</li>
                        <li><SiNextdotjs/>NextJS</li>
                        <li><SiLua/>Lua</li>
                        <li><TbBrandMysql/>MySQL</li>
                        <li><SiHtml5/>HTML</li>
                        <li><SiCss3/>CSS</li>
                    </ul>
                    <p>And a little with these:</p>
                    <ul className={styles.skills}>
                        <li><SiCplusplus/>C++</li>
                        <li><SiRust/>Rust</li>
                    </ul>
                    <p>Also I know how to work with Linux (I&apos;m using Debian for server lol)</p>
                </div>
            </div>
            <div className={styles.section + " " + styles.socials}>
                <div className={styles.wrapper}>
                    <h1>Socials</h1>
                    <p>
                        Wanna find me in internet?<br/>
                        Here some links (⁀ᗢ⁀)
                    </p>
                    <div className={styles.socials}>
                        <CopyToClipboard text="notsokodya" onCopy={discordCopy}>
                            <button className={styles.socialLink + " " + (discordCopied && styles.active)}>
                                <span><SiDiscord/>{discordCopied ? "Copied" : "Discord"}</span>
                                <MdContentCopy/>
                            </button>
                        </CopyToClipboard>
                        <SocialLink icon={SiGithub} title="GitHub" href="https://github.com/notsokodya"/>
                        <SocialLink icon={SiSteam} title="Steam" href="https://steamcommunity.com/profiles/76561198273914350"/>
                        <SocialLink icon={SiTwitter} title="Twitter" href="https://twitter.com/notsokodya"/>
                        <SocialLink icon={SiYoutube} title="Youtube" href="https://youtube.com/@notsokodya"/>
                    </div>
                </div>
            </div>
        </>
    );
}

Page.getLayout = function getLayout(page) {
	return (
		<MainLayout title="Home" description=":333">
			{page}
		</MainLayout>
	)
};
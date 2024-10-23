import styles from '@/components/footer/footer.module.css';
import Image from "next/image";
import Link from "next/link";
import {use} from "react";

export async function fetchInformation() {
    const res = await fetch(`https://api.notion.com/v1/databases/${process.env.INFORMATION_DATABASE_ID}/query`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-02-22',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`
        },
    });

    return await res.json();
}

export default function Footer() {
    const data = use(fetchInformation());
    const currentYear = new Date().getFullYear();

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.left}>
                    <Image src={'/icons/logo.svg'} alt={'luna'} width={54} height={54}/>
                    <div className={styles.column}>
                        <h2>{data?.results[0]?.properties.moto.title[0].plain_text || 'null'},</h2>
                        <h1>LUNA</h1>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.row}>
                        <Link href={'https://www.instagram.com/dimigo_luna/'} target={'_blank'}>
                            <Image src={'/icons/instagram.svg'} alt={'instagram'} width={24} height={24}/></Link>
                        <Link href={'https://github.com/LUNA-coding'} target={'_blank'}>
                            <Image src={'/icons/github.svg'} alt={'github'} width={24} height={24}/></Link>
                        <Link href={'https://www.youtube.com/channel/UCWfvTEUzP9b2pPTDBSi9IMg'} target={'_blank'}>
                            <Image src={'/icons/youtube.svg'} alt={'youtube'} width={24} height={24}/></Link>
                        <Link href={'https://www.facebook.com/lunacoding/'} target={'_blank'}>
                            <Image src={'/icons/facebook.svg'} alt={'facebook'} width={24} height={24}/></Link>
                    </div>
                    <h3>Refreshed by <Link href={'https://github.com/sspzoa'} target={'_blank'}>sspzoa</Link> /
                        Copyright © 2018-{currentYear} LUNA All rights reserved.</h3>
                </div>
            </div>
        </div>
    )
}
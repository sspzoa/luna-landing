import styles from './intro.module.css'
import Image from "next/image";
import Scroll from "@/components/scroll/Scroll";
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

export default function AwardsIntro() {
    const data = use(fetchInformation());

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <Image src="/images/awards/main.webp" alt="luna" width={397} height={301}/>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>
                        <h2>{data?.results[0]?.properties.moto.title[0].plain_text || 'null'},</h2>
                        <h1>루나의 업적</h1>
                    </div>
                    <div className={styles.description}>
                        모든 사회 구성원이 평등하길 바라는 LUNA는 <strong>2018년부터 동아리 내에서 팀을<br />
                        이루어 {data?.results[0]?.properties.contests.number || 'null'}개의 대회 등, 다양한 외부 활동에 참여</strong>하였습니다. 그 결과 LUNA는<br />
                        능력을 인정받고 <strong>지금까지 총 {data?.results[0]?.properties.rewards.number || 'null'}만원의 상금 및 지원금</strong>을 받았습니다.
                    </div>
                </div>
            </div>
            <Scroll />
        </div>
    );
}
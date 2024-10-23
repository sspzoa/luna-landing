'use client'

import styles from "./intro.module.css";
import Scroll from "@/components/scroll/Scroll";
import Spline from '@splinetool/react-spline';

export default function HomeIntro({data}: {data: any}) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.title}>
                        <h2>{data?.results[0]?.properties.moto.title[0].plain_text || 'null'},</h2>
                        <h1>LUNA</h1>
                    </div>
                    <div className={styles.description}>
                        <strong>LUNA</strong>는 한국디지털미디어고등학교의 유일한 <strong>IT 소셜벤처 동아리</strong><br />
                        로 다양한 사회적 문제들을 해결하고 <strong>모두가 함께 살 수 있는 세상을<br />
                        만들기 위해 노력하고 있습니다.</strong>
                    </div>
                </div>
                <div className={styles.right}>
                    <Spline scene="/model/luna.spline" />
                </div>
            </div>
            <Scroll/>
        </div>
    );
}

'use client'

import styles from './awards.module.css';
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function HomeAwards( { data }: { data: any }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.texts}>
                        <h1><strong>{data?.results[0]?.properties.contests.number || 'null'}</strong>개의 대회,<br/>
                            <strong>{data?.results[0]?.properties.rewards.number || 'null'}만원</strong>의 상금 및 지원금</h1>
                        <p>
                            루나는 사회 문제 해결 의지와 능력을 인정받고자 하였고, 그 결과<br/>
                            지금까지 <strong>{data?.results[0]?.properties.contests.number || 'null'}개의 대회</strong>에
                            출전하여 <strong>상금 및 지원금으로 총 {data?.results[0]?.properties.rewards.number || 'null'}<br/>
                            만원</strong>을 받았습니다.
                        </p>
                    </div>
                    <Link href="/awards">
                        <h2>루나의 업적 알아보기</h2>
                        <img src={'/icons/arrow_forward_ios.svg'} alt="arrow"/>
                    </Link>
                </div>
                <div className={styles.imageWrapper}>
                    <Image
                        src={'/images/home/award.webp'}
                        alt={'award'}
                        width={500}
                        height={330}
                        style={{
                            transform: `translateY(-${scrollPosition * 0.2 - 250}px)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

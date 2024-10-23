'use client';

import { useState, useEffect } from 'react';
import styles from './projects.module.css';
import Link from 'next/link';
import {info} from "next/dist/build/output/log";

const ids = ['first', 'second', 'third'];

export default function HomeProjects({ data, information }: { data: any, information: any }) {
    const projectData = data?.results.map((project: any) => ({
        name: project.properties.name.title[0].plain_text,
    }));

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

    const projects = [];
    for (let i = 0; i < 3; i++) {
        projects.push(
            <div key={i} className={styles.projects}>
                {projectData
                    ?.filter((_: any, index: number) => index % 3 === i)
                    .map((project: any, index: number) => (
                        <div
                            key={index}
                            id={styles[ids[index % 3]]}
                            className={styles.project}
                            style={{
                                transform: `translateX(${
                                    i === 1 ? scrollPosition * 0.2 : -scrollPosition * 0.2
                                }px)`,
                            }}
                        >
                            <p>{project.name}</p>
                        </div>
                    ))}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 id={styles.left}>루나의 크루원들은 지금까지 자발적으로</h1>
                <div className={styles.projectZone}>{projects}</div>
                <div className={styles.right}>
                    <h1>
                        <strong>{information?.results[0]?.properties.projects.number}개의 프로젝트</strong>를 진행하며
                        <br />
                        사회적인 가치를 창출해왔습니다.
                    </h1>
                    <Link href="/projects">
                        <h2>루나가 진행한 프로젝트 보러가기</h2>
                        <img src={'/icons/arrow_forward_ios.svg'} alt="arrow" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
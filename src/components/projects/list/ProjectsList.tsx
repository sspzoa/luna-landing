'use client';

import {useState, useMemo} from 'react';
import styles from './list.module.css';
import Link from "next/link";

interface Project {
    id: string;
    public_url: string;
    properties: {
        year?: { select?: { name: string; }; };
        image?: { files: { file?: { url: string; }; }[]; };
        name?: { title: { plain_text: string; }[]; };
        description?: { rich_text: { plain_text: string; }[]; };
        awards?: { multi_select: { id: string; name: string; }[]; };
    };
}

interface ProjectsListProps {
    data: {
        results: Project[];
    };
}

export default function ProjectsList({data}: ProjectsListProps) {
    const menuItems = useMemo(() => {
        const years = new Set(data?.results?.map((project) => project.properties.year?.select?.name));
        return Array.from(years);
    }, [data]);

    const [activeMenu, setActiveMenu] = useState(menuItems[0]);

    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
    };

    const filteredData = data?.results?.filter((project) => project.properties.year?.select?.name === activeMenu);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h1><strong>{activeMenu}</strong>년의 루나 프로젝트</h1>
                    <div className={styles.menu}>
                        {menuItems.map((menu) => (
                            <div
                                key={menu}
                                className={`${styles.item} ${activeMenu === menu ? styles.active : ''}`}
                                onClick={() => handleMenuClick(menu ?? '')}
                            >
                                <p>{menu}년</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.list}>
                    {filteredData?.map((project) => (
                        <Link target={'_blank'} key={project.id} href={project.public_url}>
                            <div className={styles.project}>
                                <img
                                    src={project.properties.image?.files[0]?.file?.url || '/images/projects/default.svg'}
                                    alt={project.properties.name?.title[0]?.plain_text || 'null'}
                                    width={140}
                                    height={140}
                                />
                                <div className={styles.info}>
                                    <div className={styles.title}>
                                        <h1>{project.properties.name?.title[0]?.plain_text || 'null'}</h1>
                                        <p>{project.properties.description?.rich_text[0]?.plain_text || 'null'}</p>
                                    </div>
                                    {/*<div className={styles.awards}>*/}
                                    {/*    {project.properties.awards?.multi_select?.map((award: any) => (*/}
                                    {/*        <div key={award.id} className={styles.award}>*/}
                                    {/*        <img src={'/icons/social_leaderboard.svg'} alt={'award'} width={16}*/}
                                    {/*             height={16}/>*/}
                                    {/*            {award.name}*/}
                                    {/*            <br/>*/}
                                    {/*    </div>*/}
                                    {/*    ))}*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
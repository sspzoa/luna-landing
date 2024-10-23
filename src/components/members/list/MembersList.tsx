'use client';

import { useState, useMemo } from 'react';
import styles from './list.module.css';

interface Member {
    id: string;
    properties: {
        position?: { select?: { name?: string } };
        image?: { files: { file?: { url?: string } }[] };
        name?: { title: { plain_text?: string }[] };
        generation?: { select?: { name?: string } };
        class?: { select?: { name?: string } };
        description?: { rich_text: { plain_text?: string }[] };
        lunaGeneration?: { select?: { name?: string } };
    };
}

interface MembersListProps {
    data: {
        results: Member[];
    };
}

export default function MembersList({ data }: MembersListProps) {
    const [activeMenu, setActiveMenu] = useState('LUNA 7기');

    const menuItems = useMemo(() => {
        const generations = new Set(data?.results?.map((member) => member.properties.lunaGeneration?.select?.name));
        return Array.from(generations);
    }, [data]);

    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
    };

    const filteredData = data?.results?.filter((member) => member.properties.lunaGeneration?.select?.name === activeMenu);

    const currentYear = new Date().getFullYear();
    const senior = currentYear - 2003;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h1>{activeMenu}</h1>
                    <div className={styles.menu}>
                        {menuItems.map((menu) => (
                            <div
                                key={menu}
                                className={`${styles.item} ${activeMenu === menu ? styles.active : ''}`}
                                onClick={() => handleMenuClick(menu ?? '')}
                            >
                                <p>{menu}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.list}>
                    {filteredData?.map((member) => {
                        const generation = parseInt(member.properties.generation?.select?.name?.replace('기', '') ?? '');
                        const imageUrl = member.properties.generation?.select?.name == null || generation < senior || member.properties.generation?.select?.name == 'AVHS' ? '/images/members/default.svg' : member.properties.image?.files[0]?.file?.url;

                        return (
                            <div key={member.id} className={styles.member}>
                                <h2>{member.properties.position?.select?.name || 'null'}</h2>
                                <img
                                    src={imageUrl || '/images/members/default.svg'}
                                    alt={member.properties.name?.title[0]?.plain_text || 'null'}
                                    width={140}
                                    height={140}
                                />
                                <div className={styles.info}>
                                    <h1>{member.properties.name?.title[0]?.plain_text || 'null'}</h1>
                                    <h2>
                                        {member.properties.generation?.select?.name || 'null'}{' '}
                                        {member.properties.class?.select?.name || 'null'}
                                    </h2>
                                </div>
                                <div className={styles.comment}>
                                    <p>{member.properties.description?.rich_text[0]?.plain_text || 'null'}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
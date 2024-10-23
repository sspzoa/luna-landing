'use client';

import {useState, useMemo} from 'react';
import styles from './list.module.css';

interface Award {
    id: string;
    properties: {
        year?: { select?: { name: string; }; };
        image?: { files: { file?: { url: string; }; }[]; };
        name?: { title: { plain_text: string; }[]; };
        prize?: { rich_text: { plain_text: string; }[]; };
        team?: { rich_text: { plain_text: string; }[]; };
        members?: { multi_select: { name: string; }[]; };
        date?: { date?: { start: string; end?: string; }; };
    };
}

interface AwardsListProps {
    data: {
        results: Award[];
    };
}

export default function AwardsList({data}: AwardsListProps) {
    const menuItems = useMemo(() => {
        const years = new Set(data?.results?.map((award) => award.properties.year?.select?.name));
        return Array.from(years).sort().reverse();
    }, [data]);

    const [activeMenu, setActiveMenu] = useState(menuItems[0]);

    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
    };

    const filteredData = data?.results?.filter((award) => award.properties.year?.select?.name === activeMenu);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h1><strong>{activeMenu}</strong>년의 LUNA</h1>
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
                    {filteredData?.map((award) => (
                        <div key={award.id} className={styles.award}>
                            <img
                                src={award.properties.image?.files[0]?.file?.url || '/images/awards/default.svg'}
                                alt={award.properties.name?.title[0]?.plain_text || 'null'}
                            />
                            <div className={styles.info}>
                                <div className={styles.title}>
                                    <h2>{award.properties.name?.title[0]?.plain_text || 'null'}</h2>
                                    <h1>{award.properties.prize?.rich_text[0]?.plain_text || 'null'}</h1>
                                </div>
                                <div className={styles.team}>
                                    <p>{award.properties.team?.rich_text[0]?.plain_text || 'null'}</p>
                                    <div className={styles.description}>
                                        <p>
                                            {award.properties.members?.multi_select.map((tag, index) => (
                                                <>
                                                    {tag.name}
                                                    {index !== award.properties.members!.multi_select.length - 1 && ', '}
                                                </>
                                            ))}
                                        </p>
                                        <p>
                                            {award.properties.date?.date?.start ? (
                                                <>
                                                    {new Date(award.properties.date.date.start).getFullYear()}년{' '}
                                                    {new Date(award.properties.date.date.start).getMonth() + 1}월{' '}
                                                    {new Date(award.properties.date.date.start).getDate()}일
                                                    {award.properties.date?.date?.end && (
                                                        <>
                                                            부터{' '}
                                                            {new Date(award.properties.date.date.end).getDate() -
                                                                new Date(award.properties.date.date.start).getDate() +
                                                                1}
                                                            일간
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                'null'
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
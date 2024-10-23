'use client';

import {useState} from 'react';
import styles from './list.module.css';

export default function QnaList({data}: { data: any }) {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleClick = (index: number) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.list}>
                    {data?.results?.map((qna: any, index: number) => (
                        <div key={qna.id} className={`${styles.qna} ${activeIndex === index ? styles.active : ''}`} onClick={() => handleClick(index)}>
                            <div className={`${styles.question} ${activeIndex === index ? styles.active : ''}`}>
                                <h1>Q</h1>
                                <p>{qna.properties.question?.title[0]?.plain_text || 'null'}</p>
                            </div>
                            <div className={`${styles.answerZone} ${activeIndex === index ? styles.active : ''}`}>
                                <hr/>
                                <div className={styles.answer}>
                                    <h1>A</h1>
                                    <p>{qna.properties.answer?.rich_text[0]?.plain_text?.split('\n').map((line: string, index: number) => (
                                        <span key={index}>
                                            {line}
                                            {index !== qna.properties.answer?.rich_text[0]?.plain_text?.split('\n').length - 1 &&
                                                <br/>}
                                        </span>
                                    )) || 'null'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
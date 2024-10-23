import styles from "./intro.module.css";

export default function QnaIntro() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.title}>
                        <h1>자주 묻는 질문</h1>
                    </div>
                    <div className={styles.description}>
                        루나에 대해서 자주 묻는 질문을 정리했습니다.<br/>
                        아래 질문들에 답변한 유튜브 영상이 있으니, <strong>궁금하시다면<br/>
                        영상을 시청해주세요!</strong>
                    </div>
                </div>
                <div className={styles.right}>
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/hIX8CQHqW-M?si=5B9GBHiL_EOXOWuj"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
                </div>
            </div>
        </div>
    );
}
import styles from './future.module.css';

export default function HomeFuture() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.text}>
                    루나는 앞으로도 여러분들과 함께<br/>
                    <strong>IT기술을 바탕으로 평등한 세상을 만들자</strong>는<br/>
                    목표를 향하여 무한히 달려나갈 것입니다
                </div>
                <img className={styles.topLeft} src={'/images/home/future/luna.png'} width={160} height={160}/>
                <img className={styles.topRight} src={'/images/home/future/circle3.png'} width={280} height={280}/>
                <img className={styles.bottomLeft1} src={'/images/home/future/circle1.png'} width={70} height={70}/>
                <img className={styles.bottomLeft2} src={'/images/home/future/circle2.png'} width={180} height={180}/>
                <img className={styles.bottomRight} src={'/images/home/future/hand.png'} width={430} height={430}/>
            </div>
        </div>
    );
}
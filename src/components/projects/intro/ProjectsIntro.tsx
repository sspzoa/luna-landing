import styles from './intro.module.css';
import Scroll from "@/components/scroll/Scroll";

export default function ProjectsIntro() {
    const startYear = 2018;
    const currentYear = new Date().getFullYear();
    const yearsActive = currentYear - startYear;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>지난 {yearsActive}년간의 루나</h1>
                <h2>
                    LUNA에서는 어떤 활동들을 통해 사회적 문제들을 해결했을까요?<br/>
                    <strong>스크롤하여 더 확인해보세요!</strong><br/>
                </h2>
                <Scroll/>
            </div>
        </div>
    );
}
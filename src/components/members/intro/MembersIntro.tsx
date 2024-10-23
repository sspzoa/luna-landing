import styles from "./intro.module.css";
import Scroll from "@/components/scroll/Scroll";

export default function MembersIntro() {
    const startYear = 2018;
    const currentYear = new Date().getFullYear();
    const lunaGeneration = currentYear - startYear + 1;
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Members of LUNA</h1>
                <h2>
                    2018년부터 지금의 LUNA가 있기까지,<br/>
                    <strong>LUNA의 목표를 향해 함께 달려가고 있는</strong><br/>
                    1기부터 {lunaGeneration}기까지의 멤버들과 명예 동아리원들입니다.<br/>
                </h2>
            </div>
            <Scroll />
        </div>
    );
}

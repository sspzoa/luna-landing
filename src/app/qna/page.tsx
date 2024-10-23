import styles from "./page.module.css";
import QnaIntro from "@/components/qna/intro/QnaIntro";
import QnaListPage from "@/components/qna/list/QnaListPage";

export default function Qna() {
    return (
        <div className={styles.container}>
            <QnaIntro />
            <QnaListPage />
        </div>
    );
}

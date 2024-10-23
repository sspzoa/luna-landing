import styles from "./page.module.css";
import AwardsIntro from "@/components/awards/intro/AwardsIntro";
import AwardsListPage from "@/components/awards/list/AwardsListPage";

export default function Awards() {
    return (
        <div className={styles.container}>
            <AwardsIntro />
            <AwardsListPage />
        </div>
    );
}

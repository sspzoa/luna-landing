import styles from "./page.module.css";
import MembersIntro from "@/components/members/intro/MembersIntro";
import MembersListPage from "@/components/members/list/MembersListPage";

export default function Members() {
    return (
        <div className={styles.container}>
            <MembersIntro />
            <MembersListPage />
        </div>
    );
}

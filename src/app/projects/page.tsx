import styles from "./page.module.css";
import ProjectsIntro from "@/components/projects/intro/ProjectsIntro";
import ProjectsListPage from "@/components/projects/list/ProjectsListPage";

export default function Projects() {

    return (
        <div className={styles.container}>
            <ProjectsIntro/>
            <ProjectsListPage />
        </div>
    );
}

import styles from "./page.module.css";
import HomeProjectsPage from "@/components/home/projects/HomeProjectsPage";
import HomeFuture from "@/components/home/future/HomeFuture";
import HomeAwardsPage from "@/components/home/awards/HomeAwardsPage";
import HomeIntroPage from "@/components/home/intro/HomeIntroPage";

export default function Home() {
    return (
        <div className={styles.container}>
            <HomeIntroPage />
            <HomeProjectsPage />
            <HomeAwardsPage />
            <HomeFuture />
        </div>
    );
}

'use client'

import styles from "./scroll.module.css";
import Image from "next/image";
import {usePathname} from "next/navigation";

const DARK_PAGES = ['/', '/awards'];

export default function Scroll() {
    const pathname = usePathname();
    const isDarkPage = DARK_PAGES.includes(pathname);

    const darkClass = isDarkPage ? styles.dark : '';
    const arrowImage = isDarkPage ? '/icons/arrow_dark.svg' : '/icons/arrow_light.svg';

    const handleClick = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`${styles.container} ${darkClass}`} onClick={handleClick}>
            <Image src={arrowImage} alt={'scroll'} width={36} height={36}/>
            <h1>스크롤하여 더 알아보기</h1>
        </div>
    );
}

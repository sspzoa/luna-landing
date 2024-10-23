'use client'

import { useEffect, useState } from 'react';
import styles from '@/components/header/header.module.css';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

const TRANSPARENT_PAGES = ['/members', '/projects'];

export default function Header() {
    const [isTransparentHeader, setIsTransparentHeader] = useState(true);
    const pathname = usePathname();

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsTransparentHeader(scrollPosition === 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isTransparentPage = TRANSPARENT_PAGES.includes(pathname);
    const transparentClass = isTransparentPage && isTransparentHeader ? styles.transparent : '';

    return (
        <div className={`${styles.container} ${transparentClass}`}>
            <div className={styles.header}>
                <Link href="/">
                    <div className={`${styles.logo} ${transparentClass}`}>
                        <Image src={'/icons/logo.svg'} alt={'luna'} width={20} height={20}/>
                        <h1>LUNA</h1>
                    </div>
                </Link>
                <div className={`${styles.navs} ${transparentClass}`}>
                    <Link href="/" className={pathname === '/' ? styles.active : ''}>홈</Link>
                    <Link href="/members" className={pathname === '/members' ? styles.active : ''}>멤버</Link>
                    <Link href="/awards" className={pathname === '/awards' ? styles.active : ''}>업적</Link>
                    <Link href="/projects" className={pathname === '/projects' ? styles.active : ''}>프로젝트</Link>
                    <Link href="/qna" className={pathname === '/qna' ? styles.active : ''}>Q&A</Link>
                </div>
            </div>
        </div>
    );
}
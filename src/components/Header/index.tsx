"use client";

import TransitionLink from '@/components/TransitionLink';
import styles from "@/styles/css/components/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <TransitionLink href="/" className={styles.logo}>
          <span className={styles.name}>Lucas Oliveira</span>
          <span className={styles.role}>Creative Developer & Software Engineer</span>
        </TransitionLink>

        <nav className={styles.nav}>
          <TransitionLink href="https://lucasoliveira.io/contact" className={styles.contactLink}>
            Contact Me
            <span className={styles.arrow}>↗</span>
          </TransitionLink>
        </nav>
      </div>
    </header>
  );
}

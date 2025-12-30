"use client";

import Link from "next/link";
import styles from "@/styles/css/components/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.name}>Lucas Oliveira</span>
          <span className={styles.role}>Creative Developer & Software Engineer</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="https://lucasoliveira.io/contact" className={styles.contactLink}>
            Contact Me
            <span className={styles.arrow}>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

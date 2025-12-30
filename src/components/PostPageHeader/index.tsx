"use client";

import Link from "next/link";
import styles from "@/styles/css/components/postPageHeader.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Me", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function PostPageHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Lucas Oliveira
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              [ {link.label} ]
            </Link>
          ))}
        </nav>

        <Link href="https://lucasoliveira.io/contact" className={styles.contactLink}>
          Contact Me
          <span className={styles.arrow}>↗</span>
        </Link>
      </div>
    </header>
  );
}

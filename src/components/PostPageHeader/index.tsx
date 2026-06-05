"use client";

import TransitionLink from '@/components/TransitionLink';
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
        <TransitionLink href="/" className={styles.logo}>
          Lucas Oliveira
        </TransitionLink>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <TransitionLink key={link.href} href={link.href} className={styles.navLink}>
              [ {link.label} ]
            </TransitionLink>
          ))}
        </nav>

        <TransitionLink href="https://lucasoliveira.io/contact" className={styles.contactLink}>
          Contact Me
          <span className={styles.arrow}>↗</span>
        </TransitionLink>
      </div>
    </header>
  );
}

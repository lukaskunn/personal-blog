import Link from "next/link";
import styles from "@/styles/css/components/footer.module.css";

const socialLinks = [
  { name: "Twitter", href: "https://x.com/http_lucaso" },
  { name: "GitHub", href: "https://github.com/lukaskunn" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/lucas-oliveira-io/" },
  { name: "Instagram", href: "https://www.instagram.com/http.lucaso/" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} Lucas Oliveira. All rights reserved.
        </p>

        <nav className={styles.socialNav}>
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </Link>
          ))}
          <Link href="https://lucasoliveira.io/contact" className={styles.contactLink}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}

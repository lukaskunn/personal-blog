import Link from "next/link";
import styles from "@/styles/css/components/postFooter.module.css";

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "X / Twitter", href: "https://twitter.com" },
  { name: "Dribbble", href: "https://dribbble.com" },
  { name: "GitHub", href: "https://github.com" },
];

interface PostFooterProps {
  email?: string;
}

export default function PostFooter({ email = "lucasoliveira098@gmail.com" }: PostFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>
          Let&apos;s create
          <br />
          something
          <br />
          memorable together.
        </h2>
        <a href={`mailto:${email}`} className={styles.email}>
          {email}
        </a>
      </div>

      <div className={styles.bottom}>
        <nav className={styles.socialNav}>
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              [ {link.name} ]
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>
          © {currentYear} Lucas Oliveira. Based in São Paulo.
        </p>
      </div>
    </footer>
  );
}

import styles from "@/styles/css/components/hero.module.css";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({
  title = "WRITING",
  subtitle = "Exploring the intersection of creative development, design systems, and the future of web interfaces.",
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        <span className={styles.titleRegular}>{title.slice(0, 2)}</span>
        <span className={styles.titleItalic}>{title.slice(2, 4)}</span>
        <span className={styles.titleRegular}>{title.slice(4)}</span>
      </h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </section>
  );
}

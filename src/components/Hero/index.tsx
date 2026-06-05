import styles from "@/styles/css/components/hero.module.css";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({
  title = "Notes on creative front-end",
  subtitle = "Writing on engineering, animation, and <strong>creative development</strong>.",
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        {title}
      </h1>
      <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
    </section>
  );
}

import styles from "@/styles/css/components/hero.module.css";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({
  title = "Welcome to my blog",
  subtitle = "Im Lucas Oliveira, a <strong>Creative developer and software Engineer</strong>. Here im exploring the intersection of creative development, design systems, and the future of web interfaces.",
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

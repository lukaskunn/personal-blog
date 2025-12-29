import Link from "next/link";
import { NavPost } from "@/sanity/fetch";
import styles from "@/styles/css/components/nextArticle.module.css";

interface NextArticleProps {
  post: NavPost | null;
}

export default function NextArticle({ post }: NextArticleProps) {
  if (!post) return null;

  return (
    <div className={styles.nextArticle}>
      <div className={styles.container}>
        <span className={styles.label}>Next Article</span>
        <Link href={`/post/${post.slug}`} className={styles.link}>
          <h3 className={styles.title}>{post.title}</h3>
          <span className={styles.readMore}>
            Read Next
            <span className={styles.arrow}>→</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

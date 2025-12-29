import Link from "next/link";
import { Post } from "@/types/sanity-queries";
import styles from "@/styles/css/components/postCard.module.css";

interface PostCardProps {
  post: Post;
  index: number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

function formatPostType(type: Post["postType"]): string {
  const typeMap: Record<Post["postType"], string> = {
    engineering: "Engineering",
    development: "Development",
    design: "Design",
    "case-study": "Case Study",
    personal: "Personal",
  };
  return typeMap[type] || type;
}

export default function PostCard({ post, index }: PostCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");
  const formattedDate = formatDate(post.publishedAt);

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link href={`/post/${post.slug}`} className={styles.link}>
        <div className={styles.meta}>
          <span className={styles.index}>{formattedIndex}</span>
          <span className={styles.separator}>/</span>
          <time className={styles.date} dateTime={post.publishedAt}>
            {formattedDate}
          </time>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </div>

        <div className={styles.typeWrapper}>
          <span className={styles.type}>[ {formatPostType(post.postType)} ]</span>
        </div>

        <div className={styles.arrowWrapper}>
          <span className={styles.arrow}>↗</span>
        </div>
      </Link>
    </article>
  );
}

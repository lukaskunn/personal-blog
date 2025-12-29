import Image from "next/image";
import { Post } from "@/types/sanity-queries";
import styles from "@/styles/css/components/postHeader.module.css";

interface PostHeaderProps {
  post: Post;
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

export default function PostHeader({ post }: PostHeaderProps) {
  const formattedDate = formatDate(post.publishedAt);

  return (
    <header className={styles.header}>
      <div className={styles.meta}>
        <time className={styles.date} dateTime={post.publishedAt}>
          {formattedDate}
        </time>
        <span className={styles.separator}>/</span>
        <span className={styles.type}>{formatPostType(post.postType)}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.readTime}>{post.timeToRead} Min Read</span>
      </div>

      <h1 className={styles.title}>
        {post.title.split(" ").map((word, index, array) => {
          // Make "of" and similar words italic for style
          const italicWords = ["of", "the", "and", "in", "to", "for", "a", "an"];
          const isItalic = italicWords.includes(word.toLowerCase());

          return (
            <span key={index}>
              {isItalic ? (
                <em className={styles.italic}>{word}</em>
              ) : (
                word
              )}
              {index < array.length - 1 ? " " : ""}
            </span>
          );
        })}
      </h1>

      {post.coverImage && (
        <figure className={styles.coverImageWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              priority
              className={styles.coverImage}
              placeholder={post.coverImageLqip ? "blur" : "empty"}
              blurDataURL={post.coverImageLqip}
            />
          </div>
          {post.coverImageAlt && (
            <figcaption className={styles.caption}>
              Image: {post.coverImageAlt}
            </figcaption>
          )}
        </figure>
      )}
    </header>
  );
}

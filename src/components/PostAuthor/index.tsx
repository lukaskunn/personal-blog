import Image from "next/image";
import { Author } from "@/types/sanity-queries";
import styles from "@/styles/css/components/postAuthor.module.css";

interface PostAuthorProps {
  author: Author;
}

export default function PostAuthor({ author }: PostAuthorProps) {
  return (
    <div className={styles.author}>
      <span className={styles.label}>Written by</span>
      <div className={styles.info}>
        {author.avatar && (
          <div className={styles.avatarWrapper}>
            <Image
              src={author.avatar}
              alt={author.name}
              width={40}
              height={40}
              className={styles.avatar}
            />
          </div>
        )}
        <div className={styles.details}>
          <span className={styles.name}>{author.name}</span>
          {author.bio && <span className={styles.bio}>{author.bio}</span>}
        </div>
      </div>
    </div>
  );
}

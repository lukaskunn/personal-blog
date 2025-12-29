import TableOfContents from "@/components/TableOfContents";
import { PostBody, extractHeadings } from "@/components/PortableText";
import styles from "@/styles/css/components/postContent.module.css";

interface PostContentProps {
  body: any[];
}

export default function PostContent({ body }: PostContentProps) {
  const headings = extractHeadings(body);

  return (
    <div className={styles.content}>
      <aside className={styles.sidebar}>
        <TableOfContents headings={headings} />
      </aside>
      <article className={styles.article}>
        <PostBody value={body} />
      </article>
    </div>
  );
}

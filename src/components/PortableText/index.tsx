import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import styles from "@/styles/css/components/portableText.module.css";
import { CodeBlock } from "./CodeBlock";
import { ImageBlock } from "./ImageBlock";
import { QuoteBlock } from "./QuoteBlock";
import { CalloutBlock } from "./CalloutBlock";
import { EmbedBlock } from "./EmbedBlock";
import { DividerBlock } from "./DividerBlock";
import { RelatedLinksBlock } from "./RelatedLinksBlock";

// Portable Text Components configuration
const portableTextComponents: PortableTextComponents = {
  types: {
    codeBlock: ({ value }) => <CodeBlock value={value} />,
    imageBlock: ({ value }) => <ImageBlock value={value} />,
    quoteBlock: ({ value }) => <QuoteBlock value={value} />,
    calloutBlock: ({ value }) => <CalloutBlock value={value} components={portableTextComponents} />,
    embedBlock: ({ value }) => <EmbedBlock value={value} />,
    dividerBlock: ({ value }) => <DividerBlock value={value} />,
    relatedLinksBlock: ({ value }) => <RelatedLinksBlock value={value} />,
  },
  block: {
    h2: ({ children, value }) => (
      <h2 id={value._key} className={styles.h2}>
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={value._key} className={styles.h3}>
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4 id={value._key} className={styles.h4}>
        {children}
      </h4>
    ),
    normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
    em: ({ children }) => <em className={styles.em}>{children}</em>,
    code: ({ children }) => <code className={styles.inlineCode}>{children}</code>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className={styles.list}>{children}</ul>,
    number: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.listItem}>{children}</li>,
    number: ({ children }) => <li className={styles.listItem}>{children}</li>,
  },
};

// Utility function to extract headings from body
export function extractHeadings(body: any[]): { id: string; text: string; level: number }[] {
  if (!body) return [];

  return body
    .filter((block) => block._type === "block" && ["h2", "h3"].includes(block.style))
    .map((block) => ({
      id: block._key,
      text: block.children?.map((child: any) => child.text).join("") || "",
      level: block.style === "h2" ? 2 : 3,
    }));
}

// Main PostBody component
interface PostBodyProps {
  value: any[];
}

export function PostBody({ value }: PostBodyProps) {
  return (
    <div className={styles.body}>
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}

// Export individual components
export { CodeBlock };
export { ImageBlock };
export { QuoteBlock };
export { CalloutBlock };
export { EmbedBlock };
export { DividerBlock };
export { RelatedLinksBlock };

export default PostBody;

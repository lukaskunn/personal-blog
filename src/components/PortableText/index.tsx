import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import styles from "@/styles/css/components/portableText.module.css";

// Block type definitions
interface CodeBlockValue {
  _type: "codeBlock";
  fileName?: string;
  language: string;
  code: string;
  highlightedLines?: string;
}

interface ImageBlockValue {
  _type: "imageBlock";
  image: any;
  alt?: string;
}

interface QuoteBlockValue {
  _type: "quoteBlock";
  text: string;
  author?: string;
}

interface CalloutBlockValue {
  _type: "calloutBlock";
  tone: "tip" | "warning" | "info" | "error" | "success";
  title: string;
  content: any[];
}

interface EmbedBlockValue {
  _type: "embedBlock";
  provider: "youtube" | "codesandbox" | "twitter" | "vimeo" | "codepen" | "figma" | "other";
  url: string;
  caption?: string;
}

interface DividerBlockValue {
  _type: "dividerBlock";
  style: "solid" | "dashed" | "dotted" | "stars" | "spacing";
}

interface RelatedLink {
  title: string;
  url: string;
  description?: string;
}

interface RelatedLinksBlockValue {
  _type: "relatedLinksBlock";
  title?: string;
  links: RelatedLink[];
}

// Component implementations
function CodeBlock({ value }: { value: CodeBlockValue }) {
  return (
    <div className={styles.codeBlock}>
      {value.fileName && (
        <div className={styles.codeHeader}>
          <span className={styles.fileName}>{value.fileName}</span>
          <span className={styles.language}>{value.language}</span>
        </div>
      )}
      <pre className={styles.pre}>
        <code className={`${styles.code} language-${value.language}`}>
          {value.code}
        </code>
      </pre>
    </div>
  );
}

function ImageBlock({ value }: { value: ImageBlockValue }) {
  if (!value.image) return null;

  return (
    <figure className={styles.imageBlock}>
      <div className={styles.imageWrapper}>
        <Image
          src={urlFor(value.image).width(800).url()}
          alt={value.alt || ""}
          width={800}
          height={450}
          className={styles.image}
        />
      </div>
      {value.alt && (
        <figcaption className={styles.imageCaption}>{value.alt}</figcaption>
      )}
    </figure>
  );
}

function QuoteBlock({ value }: { value: QuoteBlockValue }) {
  return (
    <blockquote className={styles.quote}>
      <span className={styles.quoteMarkStart}>&ldquo;</span>
      <p className={styles.quoteText}>{value.text}</p>
      <span className={styles.quoteMarkEnd}>&rdquo;</span>
      {value.author && <cite className={styles.quoteAuthor}>— {value.author}</cite>}
    </blockquote>
  );
}

function CalloutBlock({ value }: { value: CalloutBlockValue }) {
  const toneIcons: Record<CalloutBlockValue["tone"], string> = {
    tip: "💡",
    warning: "⚠️",
    info: "ℹ️",
    error: "❌",
    success: "✅",
  };

  return (
    <div className={`${styles.callout} ${styles[`callout${value.tone.charAt(0).toUpperCase() + value.tone.slice(1)}`]}`}>
      <div className={styles.calloutHeader}>
        <span className={styles.calloutIcon}>{toneIcons[value.tone]}</span>
        <span className={styles.calloutTitle}>{value.title}</span>
      </div>
      <div className={styles.calloutContent}>
        <PortableText value={value.content} components={portableTextComponents} />
      </div>
    </div>
  );
}

function EmbedBlock({ value }: { value: EmbedBlockValue }) {
  const getEmbedUrl = (url: string, provider: string): string => {
    if (provider === "youtube") {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (provider === "vimeo") {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <figure className={styles.embed}>
      <div className={styles.embedWrapper}>
        <iframe
          src={getEmbedUrl(value.url, value.provider)}
          title={value.caption || `${value.provider} embed`}
          allowFullScreen
          className={styles.embedIframe}
        />
      </div>
      {value.caption && (
        <figcaption className={styles.embedCaption}>{value.caption}</figcaption>
      )}
    </figure>
  );
}

function DividerBlock({ value }: { value: DividerBlockValue }) {
  const styleMap: Record<DividerBlockValue["style"], string> = {
    solid: styles.dividerSolid,
    dashed: styles.dividerDashed,
    dotted: styles.dividerDotted,
    stars: styles.dividerStars,
    spacing: styles.dividerSpacing,
  };

  if (value.style === "stars") {
    return (
      <div className={`${styles.divider} ${styleMap[value.style]}`}>
        <span>* * *</span>
      </div>
    );
  }

  return <hr className={`${styles.divider} ${styleMap[value.style || "solid"]}`} />;
}

function RelatedLinksBlock({ value }: { value: RelatedLinksBlockValue }) {
  return (
    <aside className={styles.relatedLinks}>
      <h4 className={styles.relatedLinksTitle}>
        {value.title || "Related Resources"}
      </h4>
      <ul className={styles.relatedLinksList}>
        {value.links.map((link, index) => (
          <li key={index} className={styles.relatedLinkItem}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.relatedLink}
            >
              <span className={styles.relatedLinkText}>{link.title}</span>
              <span className={styles.relatedLinkArrow}>↗</span>
            </a>
            {link.description && (
              <p className={styles.relatedLinkDescription}>{link.description}</p>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Portable Text Components configuration
const portableTextComponents: PortableTextComponents = {
  types: {
    codeBlock: ({ value }) => <CodeBlock value={value} />,
    imageBlock: ({ value }) => <ImageBlock value={value} />,
    quoteBlock: ({ value }) => <QuoteBlock value={value} />,
    calloutBlock: ({ value }) => <CalloutBlock value={value} />,
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

export default PostBody;

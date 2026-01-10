import React from "react";
import styles from "@/styles/css/components/portableText.module.css";

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

export function RelatedLinksBlock({ value }: { value: RelatedLinksBlockValue }) {
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

import React from "react";
import styles from "@/styles/css/components/portableText.module.css";

interface QuoteBlockValue {
  _type: "quoteBlock";
  text: string;
  author?: string;
}

export function QuoteBlock({ value }: { value: QuoteBlockValue }) {
  return (
    <blockquote className={styles.quote}>
      <span className={styles.quoteMarkStart}>&ldquo;</span>
      <p className={styles.quoteText}>{value.text}</p>
      <span className={styles.quoteMarkEnd}>&rdquo;</span>
      {value.author && <cite className={styles.quoteAuthor}>— {value.author}</cite>}
    </blockquote>
  );
}

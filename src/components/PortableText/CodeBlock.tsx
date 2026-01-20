'use client'
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "@/styles/css/components/portableText.module.css";
import { FaRegCopy } from "react-icons/fa";

interface CodeBlockValue {
  _type: "codeBlock";
  fileName?: string;
  language: string;
  code: string;
  highlightedLines?: string;
}

export function CodeBlock({ value }: { value: CodeBlockValue }) {
  const [copied, setCopied] = useState(false);

  const highlightedLines = value.highlightedLines
    ? value.highlightedLines
      .split(",")
      .map((range) => {
        const [start, end] = range.split("-").map(Number);
        if (end) {
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
        return [start];
      })
      .flat()
    : [];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <div className={styles.codeBlock}>
      {value.fileName && (
        <div className={styles.codeHeader}>
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{value.fileName}</span>
            <span className={styles.language}>{value.language}</span>
          </div>
        </div>
      )}
      <button onClick={handleCopy} className={styles.copyButton}>
        <FaRegCopy /> {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        language={value.language}
        style={dracula}
        customStyle={{
          margin: 0,
          borderRadius: value.fileName ? '0 0 6px 6px' : '6px',
          fontSize: '14px',
        }}
        lineProps={(lineNumber) => {
          const style: React.CSSProperties = { display: "block", background: highlightedLines.includes(lineNumber) ? "#44475A" : "transparent" };

          return { style };
        }}
        showLineNumbers
        wrapLongLines
        wrapLines
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  );
}

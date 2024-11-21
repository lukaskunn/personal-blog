import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

import styles from "./CodeBlock.module.scss";

type CodeBlockProps = {
  code: string;
  language: string;
  isCopyable: boolean;
  showLineNumbers: boolean;
  highlightLines: string;
};

const CodeBlock = ({
  code,
  language,
  showLineNumbers,
}: CodeBlockProps) => {
    const customStyle = {
        lineHeight: '1.5',
        fontSize: '1rem',
        borderRadius: '5px',
        padding: '20px'
      };

  return (
    <div className={styles.container}>
      <SyntaxHighlighter
        customStyle={customStyle}
        language={language}
        style={nightOwl}
        showLineNumbers={showLineNumbers}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

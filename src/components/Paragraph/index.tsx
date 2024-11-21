import React from "react";
import styles from "./Paragraph.module.scss";

type ParagraphProps = {
  text: string;
};

const Paragraph = ({ text }: ParagraphProps) => {
  return (
    <div className={styles["paragraph-container"]}>
      <p
        dangerouslySetInnerHTML={{ __html: text }}
        className={styles["paragraph"]}
      />
    </div>
  );
};

export default Paragraph;

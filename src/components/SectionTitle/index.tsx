import React from "react";
import styles from "./SectionTitle.module.scss";

type SectionTitleProps = {
  text: string;
};

const SectionTitle = ({text}: SectionTitleProps) => {
  return <h2 dangerouslySetInnerHTML={{__html: text}} className={styles["section-title"]}/>
};

export default SectionTitle;

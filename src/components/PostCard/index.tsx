import React from "react";

import styles from "./PostCard.module.scss";

type PostCardProps = {
  title: string;
  date: string;
};

const PostCard = ({ title, date }: PostCardProps) => {
  return (
    <a className={styles.container} href={`/article/${date}`}>
      <span className={styles["post-date"]}>{date.slice(5).replaceAll("-", " · ")}</span>
      <span className={styles["post-title"]}>{title}</span>
    </a>
  );
};

export default PostCard;

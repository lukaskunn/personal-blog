import React from "react";

import styles from "./PostCard.module.scss";

type PostCardProps = {
  title: string;
  date: string;
};

const PostCard = ({ title, date }: PostCardProps) => {
  return (
    <div className={styles.container}>
      <span className={styles["post-date"]}>{date.slice(5).replaceAll("-", " · ")}</span>
      <span className={styles["post-title"]}>{title}</span>
    </div>
  );
};

export default PostCard;

import React from "react";

import PostCard from "../PostCard";
import styles from "./PostCardGroup.module.scss";

type PostCardProps = {
  allPosts: {
    year: string;
    data: {
      title: string;
      date: string;
    }[];
  }[];
};

const PostCardGroup = ({ allPosts }: PostCardProps) => {
  return allPosts.length > 0 ? (
    allPosts.map((groupYear) => {
      const { year, data } = groupYear;

      return (
        <div key={year} className={styles["year-container"]}>
          <h3 className={styles["year-title"]}>{year}</h3>
          {data.map((singlePost) => {
            const { title, date } = singlePost;
            return <PostCard key={title} title={title} date={date} />;
          })}
        </div>
      );
    })
  ) : (
    <p>Nothing to show yet</p>
  );
};

export default PostCardGroup;

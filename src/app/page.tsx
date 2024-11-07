import React from "react";
import styles from "./Home.module.scss";

import PostCard from "../components/PostCard";

type AllPostsData = {
  year: string;
  data: {
    title: string;
    date: string;
  }[];
}[];

import allPosts from "../../public/content/all-posts.json";

export default async function Home() {
  const postsData: AllPostsData = allPosts;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <a className={styles["breadcrumb-link"]} href="https://lucasoliveira.io">@http.lucaso</a> / home /</div>
        </div>
        <h1 className={styles["page-title"]}>Hi, my name is Lucas</h1>
        <p className={styles["page-subtitle"]}>Welcome to my blog</p>
        {postsData.map((singleYear) => {
          const { year, data } = singleYear;

          return (
            <div key={year} className={styles["year-container"]}>
              <h3 key={singleYear.year} className={styles["year-title"]}>{singleYear.year}</h3>
              {data.map((singlePost) => {
                const { title, date } = singlePost;
                return <PostCard key={title} title={title} date={date} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}


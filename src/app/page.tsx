import React from "react";
import styles from "./Home.module.scss";

import BreadCrumb from "@/components/BreadCrumb";
import PostCardGroup from "@/components/PostCardGroup";

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
        <BreadCrumb />
        <h1 className={styles["page-title"]}>Hi, my name is Lucas</h1>
        <p className={styles["page-subtitle"]}>Welcome to my blog</p>
        <PostCardGroup allPosts={postsData} />
      </div>
    </div>
  );
}


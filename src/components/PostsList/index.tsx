"use client";

import { useState, useMemo } from "react";
import { Post } from "@/types/sanity-queries";
import PostCard from "@/components/PostCard";
import styles from "@/styles/css/components/postsList.module.css";

interface PostsListProps {
  posts: Post[];
  totalPosts: number;
}

type FilterType = "all" | Post["postType"];

const filters: { label: string; value: FilterType }[] = [
  { label: "All Posts", value: "all" },
  { label: "Engineering", value: "engineering" },
  { label: "Development", value: "development" },
  { label: "Design", value: "design" },
  { label: "Case Studies", value: "case-study" },
  { label: "Personal", value: "personal" },
];

export default function PostsList({ posts, totalPosts }: PostsListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "all") {
      return posts;
    }
    return posts.filter((post) => post.postType === activeFilter);
  }, [posts, activeFilter]);

  const displayCount =
    activeFilter === "all" ? totalPosts : filteredPosts.length;

  return (
    <section className={styles.postsSection}>
      <nav className={styles.filters} aria-label="Post filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`${styles.filterButton} ${activeFilter === filter.value ? styles.active : ""
              }`}
            onClick={() => setActiveFilter(filter.value)}
            aria-pressed={activeFilter === filter.value}
          >
            {filter.label}
            {filter.value === "all" && (
              <span className={styles.count}>({displayCount})</span>
            )}
          </button>
        ))}
      </nav>

      <div className={styles.postsList}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))
        ) : (
          <p className={styles.emptyState}>
            No posts found for this category.
          </p>
        )}
      </div>

      {posts.length > 0 && (
        <div className={styles.loadMore}>
          <button className={styles.loadMoreButton}>Load Archives</button>
        </div>
      )}
    </section>
  );
}

import Hero from "@/components/Hero";
import PostsList from "@/components/PostsList";
import { getAllPosts } from "@/sanity/fetch";
import styles from "@/styles/css/pages/page.module.css";

export default async function Home() {
  const { posts, totalPosts } = await getAllPosts(1, 20);

  return (
    <div className={styles.page}>
      <main className={styles.main} id="main-content">
        <Hero />
        <PostsList posts={posts} totalPosts={totalPosts} />
      </main>
    </div>
  );
}

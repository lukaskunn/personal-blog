import { notFound } from "next/navigation";
import { getPostBySlug, getNextPost } from "@/sanity/fetch";
import PostHeader from "@/components/PostHeader";
// import PostAuthor from "@/components/PostAuthor";
import PostContent from "@/components/PostContent";
import NextArticle from "@/components/NextArticle";
import styles from "@/styles/css/pages/post-page.module.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const nextPost = await getNextPost(post.publishedAt, post.slug);

  return (
    <div className={styles.page}>
      <main className={styles.main} id="main-content">
        <PostHeader post={post} />
        {/* <div className={styles["page-breaker"]} />
        {post.author && <PostAuthor author={post.author} />} */}
        <PostContent body={post.body || []} />
        <NextArticle post={nextPost} />
      </main>
    </div>
  );
}

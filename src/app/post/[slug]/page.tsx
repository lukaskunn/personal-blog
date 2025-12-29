import { notFound } from "next/navigation";
import { getPostBySlug, getNextPost } from "@/sanity/fetch";
import PostPageHeader from "@/components/PostPageHeader";
import PostHeader from "@/components/PostHeader";
import PostAuthor from "@/components/PostAuthor";
import PostContent from "@/components/PostContent";
import NextArticle from "@/components/NextArticle";
import PostFooter from "@/components/PostFooter";
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
      <PostPageHeader />
      <main className={styles.main} id="main-content">
        <PostHeader post={post} />
        {post.author && <PostAuthor author={post.author} />}
        <PostContent body={post.body || []} />
        <NextArticle post={nextPost} />
      </main>
      <PostFooter />
    </div>
  );
}

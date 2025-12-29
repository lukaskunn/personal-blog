import { createClient } from 'next-sanity'
import {
  postsQuery,
  postBySlugQuery,
  postsCountQuery,
  postsByTypeQuery,
  relatedPostsQuery,
  nextPostQuery,
  prevPostQuery,
  type Post
} from '../sanity-queries'

// Type for navigation posts
export interface NavPost {
  _id: string
  title: string
  slug: string
  postType: Post['postType']
}

// Configure your Sanity client
// You can get these values from your sanity.config.ts or environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false if you need fresh data
})

// ====================
// USAGE EXAMPLES
// ====================

/**
 * Example: Get all posts with pagination
 * Use this in Server Components or API routes
 */
export async function getAllPosts(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  const posts = await client.fetch<Post[]>(postsQuery, { start, end })
  const totalPosts = await client.fetch<number>(postsCountQuery)

  return {
    posts,
    totalPosts,
    totalPages: Math.ceil(totalPosts / pageSize),
    currentPage: page
  }
}

/**
 * Example: Get a single post by slug
 * Use this for individual blog post pages
 */
export async function getPostBySlug(slug: string) {
  const post = await client.fetch<Post>(postBySlugQuery, { slug })
  return post
}

/**
 * Example: Get posts by type
 */
export async function getPostsByType(
  postType: Post['postType'],
  page: number = 1,
  pageSize: number = 10
) {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  const posts = await client.fetch<Post[]>(postsByTypeQuery, {
    postType,
    start,
    end
  })

  return posts
}

/**
 * Example: Get related posts
 */
export async function getRelatedPosts(
  currentSlug: string,
  postType: Post['postType'],
  limit: number = 3
) {
  const posts = await client.fetch<Post[]>(relatedPostsQuery, {
    slug: currentSlug,
    postType,
    limit
  })

  return posts
}

/**
 * Get the next post for navigation
 */
export async function getNextPost(publishedAt: string, slug: string) {
  const post = await client.fetch<NavPost | null>(nextPostQuery, {
    publishedAt,
    slug
  })
  return post
}

/**
 * Get the previous post for navigation
 */
export async function getPrevPost(publishedAt: string, slug: string) {
  const post = await client.fetch<NavPost | null>(prevPostQuery, {
    publishedAt,
    slug
  })
  return post
}

// ====================
// NEXT.JS APP ROUTER EXAMPLES
// ====================

/**
 * Example usage in a Next.js App Router page (app/blog/page.tsx)
 *
 * export default async function BlogPage({
 *   searchParams,
 * }: {
 *   searchParams: { page?: string }
 * }) {
 *   const page = Number(searchParams.page) || 1
 *   const { posts, totalPages, currentPage } = await getAllPosts(page, 10)
 *
 *   return (
 *     <div>
 *       <h1>Blog Posts</h1>
 *       {posts.map(post => (
 *         <article key={post._id}>
 *           <h2>{post.title}</h2>
 *           <p>{post.excerpt}</p>
 *           <Link href={`/blog/${post.slug}`}>Read more</Link>
 *         </article>
 *       ))}
 *       <Pagination currentPage={currentPage} totalPages={totalPages} />
 *     </div>
 *   )
 * }
 */

/**
 * Example usage for a single post page (app/blog/[slug]/page.tsx)
 *
 * export default async function PostPage({
 *   params,
 * }: {
 *   params: { slug: string }
 * }) {
 *   const post = await getPostBySlug(params.slug)
 *
 *   if (!post) {
 *     notFound()
 *   }
 *
 *   const relatedPosts = await getRelatedPosts(post.slug, post.postType, 3)
 *
 *   return (
 *     <article>
 *       <h1>{post.title}</h1>
 *       <img src={post.coverImage} alt={post.coverImageAlt} />
 *       <div>
 *         <span>{post.postType}</span>
 *         <span>{post.timeToRead} min read</span>
 *       </div>
 *       <div>
 *         <img src={post.author.avatar} alt={post.author.name} />
 *         <span>{post.author.name}</span>
 *       </div>
 *       <PortableText value={post.body} />
 *
 *       <h2>Related Posts</h2>
 *       {relatedPosts.map(related => (
 *         <Link key={related._id} href={`/blog/${related.slug}`}>
 *           {related.title}
 *         </Link>
 *       ))}
 *     </article>
 *   )
 * }
 *
 * // Generate static params for static generation
 * export async function generateStaticParams() {
 *   const posts = await client.fetch<Array<{ slug: string }>>(
 *     `*[_type == "post"]{ "slug": slug.current }`
 *   )
 *
 *   return posts.map((post) => ({
 *     slug: post.slug,
 *   }))
 * }
 */

// ====================
// NEXT.JS PAGES ROUTER EXAMPLES
// ====================

/**
 * Example usage in Pages Router (pages/blog/index.tsx)
 *
 * export async function getStaticProps({ params }) {
 *   const { posts, totalPages } = await getAllPosts(1, 10)
 *
 *   return {
 *     props: {
 *       posts,
 *       totalPages,
 *     },
 *     revalidate: 60, // Revalidate every 60 seconds
 *   }
 * }
 *
 * export default function BlogPage({ posts, totalPages }) {
 *   return (
 *     <div>
 *       <h1>Blog Posts</h1>
 *       {posts.map(post => (
 *         <article key={post._id}>
 *           <h2>{post.title}</h2>
 *           <p>{post.excerpt}</p>
 *           <Link href={`/blog/${post.slug}`}>Read more</Link>
 *         </article>
 *       ))}
 *     </div>
 *   )
 * }
 */

/**
 * Example usage for single post in Pages Router (pages/blog/[slug].tsx)
 *
 * export async function getStaticPaths() {
 *   const posts = await client.fetch<Array<{ slug: string }>>(
 *     `*[_type == "post"]{ "slug": slug.current }`
 *   )
 *
 *   return {
 *     paths: posts.map((post) => ({
 *       params: { slug: post.slug },
 *     })),
 *     fallback: 'blocking',
 *   }
 * }
 *
 * export async function getStaticProps({ params }) {
 *   const post = await getPostBySlug(params.slug)
 *
 *   if (!post) {
 *     return {
 *       notFound: true,
 *     }
 *   }
 *
 *   const relatedPosts = await getRelatedPosts(post.slug, post.postType, 3)
 *
 *   return {
 *     props: {
 *       post,
 *       relatedPosts,
 *     },
 *     revalidate: 60,
 *   }
 * }
 *
 * export default function PostPage({ post, relatedPosts }) {
 *   return (
 *     <article>
 *       <h1>{post.title}</h1>
 *       <img src={post.coverImage} alt={post.coverImageAlt} />
 *       <PortableText value={post.body} />
 *     </article>
 *   )
 * }
 */

import { groq } from 'next-sanity'

// Re-export Post type for convenience
export type { Post, Author } from '@/types/sanity-queries'

/**
 * Query to get all posts with pagination
 *
 * @param start - Starting index for pagination (default: 0)
 * @param end - Ending index for pagination (default: 10)
 * @returns Array of posts with author information
 */
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) [$start...$end] {
  _id,
  _createdAt,
  title,
  subtitle,
  status,
  "slug": slug.current,
  publishedAt,
  postType,
  timeToRead,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImageAlt,
  "coverImageCaption": coverImageCaption,
  "coverImageLqip": coverImage.asset->metadata.lqip,
  "author": author->{
    _id,
    name,
    email,
    bio,
    "avatar": avatar.asset->url
  }
}`

/**
 * Query to get a single post by slug
 *
 * @param slug - The slug of the post
 * @returns Single post with full content and author information
 */
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  publishedAt,
  postType,
  timeToRead,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImageAlt,
  "coverImageCaption": coverImageCaption,
  "coverImageLqip": coverImage.asset->metadata.lqip,
  "author": author->{
    _id,
    name,
    email,
    bio,
    "avatar": avatar.asset->url
  },
  body
}`

/**
 * Query to get total count of posts
 * Useful for pagination
 */
export const postsCountQuery = groq`count(*[_type == "post"])`

/**
 * Query to get posts by type
 *
 * @param postType - The type of post (engineering, development, design, case-study, personal)
 * @param start - Starting index for pagination
 * @param end - Ending index for pagination
 */
export const postsByTypeQuery = groq`*[_type == "post" && postType == $postType] | order(publishedAt desc) [$start...$end] {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  publishedAt,
  postType,
  timeToRead,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  "author": author->{
    _id,
    name,
    bio,
    "avatar": avatar.asset->url
  },
  "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
}`

/**
 * Query to get related posts based on post type
 * Excludes the current post
 *
 * @param slug - Current post slug to exclude
 * @param postType - The type of post to match
 * @param limit - Number of related posts to return
 */
export const relatedPostsQuery = groq`*[_type == "post" && postType == $postType && slug.current != $slug] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  postType,
  timeToRead,
  "coverImage": coverImage.asset->url,
  "author": author->{
    name,
    "avatar": avatar.asset->url
  }
}`

/**
 * Query to get the next post (for navigation)
 * Gets the next published post after the current one
 *
 * @param publishedAt - Current post's publish date
 * @param slug - Current post slug to exclude
 */
export const nextPostQuery = groq`*[_type == "post" && publishedAt < $publishedAt && slug.current != $slug && status != "draft" && status != "archived"] | order(publishedAt desc) [0] {
  _id,
  title,
  "slug": slug.current,
  postType
}`

/**
 * Query to get the previous post (for navigation)
 * Gets the previous published post before the current one
 *
 * @param publishedAt - Current post's publish date
 * @param slug - Current post slug to exclude
 */
export const prevPostQuery = groq`*[_type == "post" && publishedAt > $publishedAt && slug.current != $slug && status != "draft" && status != "archived"] | order(publishedAt asc) [0] {
  _id,
  title,
  "slug": slug.current,
  postType
}`

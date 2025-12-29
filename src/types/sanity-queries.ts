// TypeScript types for the queries
export interface Author {
  _id: string
  name: string
  email: string
  bio?: string
  avatar?: string
}

export interface Post {
  _id: string
  _createdAt: string
  title: string
  slug: string
  publishedAt: string
  postType: 'engineering' | 'development' | 'design' | 'case-study' | 'personal'
  timeToRead: number
  coverImage: string
  coverImageAlt?: string
  coverImageLqip?: string
  author: Author
  body?: any[] // Portable Text content
  excerpt?: string
}
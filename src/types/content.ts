export interface SanityImage {
  _type: 'image'
  asset: {
    _id: string
    url: string
    metadata?: {
      dimensions: {
        width: number
        height: number
        aspectRatio: number
      }
      lqip?: string
      palette?: {
        dominant?: {
          background?: string
          foreground?: string
        }
      }
    }
  }
  alt: string
  caption?: string
}

export interface SEO {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogImage?: SanityImage
}
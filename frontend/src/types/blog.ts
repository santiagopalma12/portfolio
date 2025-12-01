export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  published: boolean
  publishedAt?: string
  views: number
  readTime: number
  createdAt: string
  updatedAt: string
  author: Author
  tags: Tag[]
}

export interface Author {
  id: string
  name: string
  email: string
}

export interface Tag {
  id: string
  name: string
  color: string
}

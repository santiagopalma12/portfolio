export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  imageUrl?: string
  demoUrl?: string
  repoUrl?: string
  technologies: string[]
  featured: boolean
  published: boolean
  order: number
  createdAt: string
  updatedAt: string
  tags: Tag[]
}

export interface Tag {
  id: string
  name: string
  color: string
}

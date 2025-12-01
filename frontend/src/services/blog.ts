import api from './api'
import type { BlogPost } from '../types/blog'
import type { ApiResponse, PaginatedResponse } from '../types/api'

export async function getPosts(): Promise<BlogPost[]> {
  const response = await api.get<ApiResponse<BlogPost[]>>('/posts')
  return response.data.data
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const response = await api.get<ApiResponse<BlogPost>>(`/posts/${slug}`)
  return response.data.data
}

export async function getPaginatedPosts(
  page = 1,
  limit = 10
): Promise<PaginatedResponse<BlogPost>> {
  const response = await api.get<PaginatedResponse<BlogPost>>(`/posts?page=${page}&limit=${limit}`)
  return response.data
}

// Mock data for development
export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cómo construí mi portfolio con React y TypeScript',
    slug: 'portfolio-react-typescript',
    excerpt: 'Una guía completa sobre cómo crear un portfolio moderno usando las últimas tecnologías web.',
    content: 'Contenido completo del artículo...',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    published: true,
    publishedAt: '2025-01-01',
    views: 1234,
    readTime: 8,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    author: { id: '1', name: 'Santiago', email: 'santiago@santiago.me' },
    tags: [{ id: '1', name: 'React', color: '#61DAFB' }],
  },
  {
    id: '2',
    title: 'Guía de Docker para desarrolladores',
    slug: 'docker-guia-desarrolladores',
    excerpt: 'Aprende a containerizar tus aplicaciones y simplificar el proceso de deployment.',
    content: 'Contenido completo del artículo...',
    coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800',
    published: true,
    publishedAt: '2025-01-01',
    views: 856,
    readTime: 12,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    author: { id: '1', name: 'Santiago', email: 'santiago@santiago.me' },
    tags: [{ id: '3', name: 'Docker', color: '#2496ED' }],
  },
  {
    id: '3',
    title: 'TypeScript: Tips y trucos avanzados',
    slug: 'typescript-tips-avanzados',
    excerpt: 'Mejora tu código TypeScript con estos patrones y técnicas avanzadas.',
    content: 'Contenido completo del artículo...',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    published: true,
    publishedAt: '2025-01-01',
    views: 2045,
    readTime: 10,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    author: { id: '1', name: 'Santiago', email: 'santiago@santiago.me' },
    tags: [{ id: '4', name: 'TypeScript', color: '#3178C6' }],
  },
]

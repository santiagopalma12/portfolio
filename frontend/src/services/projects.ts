import api from './api'
import type { Project } from '../types/project'
import type { ApiResponse, PaginatedResponse } from '../types/api'

export async function getProjects(): Promise<Project[]> {
  const response = await api.get<ApiResponse<Project[]>>('/projects')
  return response.data.data
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const response = await api.get<ApiResponse<Project[]>>('/projects?featured=true')
  return response.data.data
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const response = await api.get<ApiResponse<Project>>(`/projects/${slug}`)
  return response.data.data
}

export async function getPaginatedProjects(
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Project>> {
  const response = await api.get<PaginatedResponse<Project>>(`/projects?page=${page}&limit=${limit}`)
  return response.data
}

// Mock data for development (when backend is not available)
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Web Personal',
    slug: 'portfolio-web',
    description: 'Mi portfolio profesional construido con React, TypeScript y TailwindCSS. Incluye blog, proyectos y formulario de contacto.',
    content: 'Contenido detallado del proyecto...',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    demoUrl: 'https://santiago.me',
    repoUrl: 'https://github.com/santiago/portfolio',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
    featured: true,
    published: true,
    order: 1,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    tags: [{ id: '1', name: 'React', color: '#61DAFB' }],
  },
  {
    id: '2',
    title: 'API RESTful con Node.js',
    slug: 'api-nodejs',
    description: 'Backend robusto con Express, PostgreSQL y Redis. Autenticación JWT y documentación Swagger.',
    content: 'Contenido detallado del proyecto...',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    demoUrl: 'https://api.santiago.me',
    repoUrl: 'https://github.com/santiago/api',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    featured: true,
    published: true,
    order: 2,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    tags: [{ id: '2', name: 'Node.js', color: '#339933' }],
  },
  {
    id: '3',
    title: 'App de Gestión de Tareas',
    slug: 'task-manager',
    description: 'Aplicación fullstack para gestionar proyectos y tareas con drag & drop y notificaciones en tiempo real.',
    content: 'Contenido detallado del proyecto...',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
    demoUrl: 'https://tasks.santiago.me',
    repoUrl: 'https://github.com/santiago/task-manager',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    featured: true,
    published: true,
    order: 3,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    tags: [{ id: '1', name: 'React', color: '#61DAFB' }],
  },
]

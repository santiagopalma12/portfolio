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
    title: 'Keif-Gotchi CLI 🐙',
    slug: 'keif-gotchi',
    description: 'Tamagotchi CLI que gamifica tu workflow de Git. "El Calamar" vive en tu terminal, se alimenta de tus commits y juzga tus hábitos de código. Construido para la competencia GitKraken "Dev Passion Project".',
    content: `Keif-Gotchi es el primer Accountability Partner basado en CLI que gamifica tu workflow de Git.

**El Problema:** Todos tenemos malos hábitos: mensajes de commit "WIP", force push a main, commits semanales con 50 archivos.

**La Solución:** Un Kraken 8-bit que vive en tus Git Hooks y evoluciona según tu estilo de código:
- 🍎 **Dieta Saludable:** Commits atómicos con mensajes descriptivos (+XP, +Health)
- 🤢 **Indigestión:** Commits masivos (>20 archivos) enferman a Keif (-Health)
- 😴 **Aburrimiento:** Mensajes "fix", "wip" o de 1 palabra = Keif te roastea

**Easter Egg:** Intenta hacer \`git push --force\`. Keif se ASUSTA y pierdes puntos de estilo.`,
    imageUrl: '/projects/keif-gotchi.png',
    demoUrl: '',
    repoUrl: 'https://github.com/santiagopalma12/Keif-Gotchi-CLI',
    technologies: ['TypeScript', 'Ink (React CLI)', 'Simple-Git', 'Git Hooks', 'Conf'],
    featured: true,
    published: true,
    order: 1,
    createdAt: '2025-11-01',
    updatedAt: '2025-12-01',
    tags: [{ id: '1', name: 'TypeScript', color: '#3178C6' }, { id: '2', name: 'CLI', color: '#4EAA25' }],
  },
  {
    id: '2',
    title: 'SmartChimera',
    slug: 'smartchimera',
    description: 'Motor de formación inteligente de equipos de desarrollo. Utiliza grafos Neo4j, algoritmos de centralidad de Brandes y optimización por Beam Search para formar equipos óptimos minimizando el Bus Factor.',
    content: `SmartChimera es un sistema avanzado de formación de equipos que transforma el proceso subjetivo en decisiones basadas en datos y algoritmos probados.

**Arquitectura:**
- **Backend:** FastAPI + Neo4j para modelar relaciones complejas
- **Frontend:** React + TypeScript + Vite para visualización interactiva
- **Algoritmos:** Brandes Betweenness Centrality + Beam Search Optimization

**Características:**
- 🔍 **Linchpin Detection:** Detecta empleados críticos usando centralidad de intermediación
- 👥 **Smart Team Formation:** Optimiza equipos con Beam Search
- 🎯 **Mission Profiles:** Perfiles predefinidos (Speed, Quality, Resilient)
- 📊 **Sistema de Scoring:** Validación multi-fuente de competencias

**Stack:** Python, FastAPI, Neo4j, Cypher, React, TypeScript, Docker`,
    imageUrl: '/projects/chimera.png',
    demoUrl: '',
    repoUrl: 'https://github.com/santiagopalma12/SmartChimera',
    blogSlug: 'smartchimera',
    technologies: ['Python', 'FastAPI', 'Neo4j', 'Cypher', 'React', 'TypeScript', 'Tailwind CSS', 'Docker'],
    featured: true,
    published: true,
    order: 2,
    createdAt: '2025-10-01',
    updatedAt: '2025-12-01',
    tags: [{ id: '3', name: 'Python', color: '#3776AB' }, { id: '4', name: 'Neo4j', color: '#008CC1' }],
  },
  {
    id: '3',
    title: 'YACHAY - Clinical AI',
    slug: 'yachay',
    description: 'Sistema de soporte clínico con IA para Diabetes Tipo 2. Pipeline completo de ML: desde ingesta de datos de glucosa hasta alertas predictivas usando LSTM y XGBoost.',
    content: `YACHAY es un sistema de soporte a decisiones clínicas para el manejo de Diabetes Tipo 2.

**Pipeline de ML Completo:**

📊 **RAW DATA (Ingesta):**
- TimescaleDB: Glucosa, actividad, comidas (series temporales)
- PostgreSQL: Datos clínicos HCE
- Redis: Cache en tiempo real

⚙️ **FEATURE STORE (Ingeniería):**
- Lag features (t-15m, t-30m, t-1h, t-24h)
- Rolling stats (mean, std, min, max over 3h/24h)
- IOB calculation (insulin decay)
- COB calculation (carb absorption)
- Temporal encoding (hour, day, cyclic)

🧠 **INFERENCE (Modelos):**
- LSTM: Predicción de glucosa
- XGBoost: Risk scoring
- Rules: Safety layer

🚨 **OUTPUT:** Alertas + Acciones recomendadas

**Estado:** En desarrollo activo - Prototipo en construcción`,
    imageUrl: '/projects/yachay.png',
    demoUrl: '',
    repoUrl: 'https://github.com/santiagopalma12/YACHAY',
    technologies: ['Python', 'PyTorch', 'LSTM', 'XGBoost', 'FastAPI', 'TimescaleDB', 'PostgreSQL', 'Redis', 'HL7 FHIR'],
    featured: true,
    published: true,
    order: 3,
    createdAt: '2025-09-01',
    updatedAt: '2025-12-01',
    tags: [{ id: '5', name: 'AI/ML', color: '#FF6F00' }, { id: '6', name: 'Healthcare', color: '#E91E63' }],
  },
]

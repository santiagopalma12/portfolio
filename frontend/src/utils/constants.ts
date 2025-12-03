export const API_URL = import.meta.env.VITE_API_URL || 'https://api.santiagopalma.me/api/v1'

export const SOCIAL_LINKS = {
  github: 'https://github.com/santiagopalma12',
  linkedin: 'https://www.linkedin.com/in/santiago-enrique-palma-apaza-0208711b0/',
  youtube: 'https://www.youtube.com/@SorevaSP',
  email: 'spalmaa@unsa.edu.pe',
}

export const NAV_ITEMS = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experiencia', href: '#experience' },
  { name: 'Contacto', href: '#contact' },
]

export const SKILLS = {
  frontend: [
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 90 },
    { name: 'TailwindCSS', level: 85 },
    { name: 'React Three Fiber', level: 70 },
    { name: 'Ink (React CLI)', level: 80 },
  ],
  backend: [
    { name: 'Python', level: 90 },
    { name: 'FastAPI', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Neo4j', level: 85 },
    { name: 'PostgreSQL', level: 80 },
  ],
  aiml: [
    { name: 'PyTorch', level: 80 },
    { name: 'XGBoost', level: 75 },
    { name: 'LSTM Networks', level: 75 },
    { name: 'Feature Engineering', level: 80 },
    { name: 'TimescaleDB', level: 70 },
  ],
  tools: [
    { name: 'Git', level: 95 },
    { name: 'Docker', level: 85 },
    { name: 'Linux', level: 80 },
    { name: 'Cytoscape.js', level: 75 },
    { name: 'CI/CD', level: 75 },
  ],
}

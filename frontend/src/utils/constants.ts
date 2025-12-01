export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export const SOCIAL_LINKS = {
  github: 'https://github.com/santiago',
  linkedin: 'https://linkedin.com/in/santiago',
  twitter: 'https://twitter.com/santiago',
  email: 'santiago@santiago.me',
}

export const NAV_ITEMS = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experiencia', href: '#experience' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contacto', href: '#contact' },
]

export const SKILLS = {
  frontend: [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'TailwindCSS', level: 90 },
    { name: 'Vue.js', level: 70 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 85 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'Redis', level: 70 },
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 75 },
    { name: 'AWS', level: 65 },
    { name: 'Linux', level: 80 },
    { name: 'CI/CD', level: 75 },
  ],
}

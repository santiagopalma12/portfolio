import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Estudiante de Ingeniería de Sistemas',
    company: 'Universidad Nacional de San Agustín',
    location: 'Arequipa, Perú',
    period: '2021 - Presente',
    description: 'Formación en ingeniería de software, bases de datos, inteligencia artificial y sistemas distribuidos. Desarrollo de proyectos de investigación en AI/ML aplicado a healthcare.',
    technologies: ['Python', 'Java', 'PostgreSQL', 'Machine Learning'],
  },
  {
    title: 'Desarrollador - Keif-Gotchi CLI',
    company: 'GitKraken Competition 2025',
    location: 'Remoto',
    period: '2025',
    description: 'Desarrollo de CLI Tamagotchi que gamifica el workflow de Git. Implementación de Git Hooks, sistema de puntos/evolución, y renderizado 8-bit en terminal usando Ink (React para CLI).',
    technologies: ['TypeScript', 'Ink', 'Simple-Git', 'Git Hooks'],
  },
  {
    title: 'Desarrollador - Project Chimera',
    company: 'Proyecto Personal',
    location: 'Arequipa, Perú',
    period: '2025',
    description: 'Sistema de formación de equipos usando grafos de conocimiento. Diseño de modelo de datos en Neo4j, algoritmo de detección de Linchpins, y visualización interactiva con Cytoscape.js.',
    technologies: ['Python', 'FastAPI', 'Neo4j', 'React', 'Docker'],
  },
  {
    title: 'Investigador - YACHAY Clinical AI',
    company: 'Proyecto de Investigación',
    location: 'Arequipa, Perú',
    period: '2025 - Presente',
    description: 'Diseño e implementación de pipeline de ML para soporte clínico en Diabetes Tipo 2. Feature engineering para series temporales de glucosa, modelos LSTM y XGBoost para predicción y risk scoring.',
    technologies: ['PyTorch', 'XGBoost', 'TimescaleDB', 'FastAPI', 'HL7 FHIR'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="heading-2">
            Mi <span className="text-gradient">Experiencia</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Un recorrido por mi trayectoria profesional y los lugares donde he 
            tenido la oportunidad de crecer y aportar.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 md:-translate-x-0.5" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative pl-12 md:pl-0 pb-12 last:pb-0 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-2 md:left-1/2 top-1 w-5 h-5 rounded-full bg-primary-500 border-4 border-white dark:border-slate-900 md:-translate-x-1/2 z-10`}
                />

                {/* Content */}
                <div
                  className={`p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                    {exp.period}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-primary-500 font-medium">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    {exp.description}
                  </p>
                  <div className={`mt-4 flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download CV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="/cv.html?print"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Ver CV Completo
          </a>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-black">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-neutral-100 dark:bg-neutral-900 rounded-lg -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-neutral-200 dark:bg-neutral-800 rounded-lg -z-10" />
              
              {/* Image placeholder - replace with your photo */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="/profile.jpg" 
                  alt="Santiago Palma" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-2">
              Sobre <span className="text-gradient">Mí</span>
            </h2>
            
            <div className="mt-6 space-y-4 text-neutral-600 dark:text-neutral-400 text-lg">
              <p>
                ¡Hola! Soy Santiago, estudiante de Ingeniería de Sistemas en la 
                Universidad Nacional de San Agustín de Arequipa (UNSA), apasionado 
                por la intersección entre AI/ML y experiencias de desarrollo innovadoras.
              </p>
              <p>
                Me especializo en crear soluciones que van desde sistemas de soporte 
                clínico con machine learning (YACHAY) hasta herramientas que gamifican 
                el workflow de desarrolladores (Keif-Gotchi CLI).
              </p>
              <p>
                Cuando no estoy entrenando modelos LSTM o diseñando grafos en Neo4j, 
                me encontrarás explorando nuevas formas de hacer el desarrollo de 
                software más divertido y eficiente.
              </p>
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: '3', label: 'Proyectos destacados' },
                { value: 'UNSA', label: 'Universidad' },
                { value: 'AI/ML', label: 'Especialización' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="text-3xl font-bold text-black dark:text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

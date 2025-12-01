import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-slate-900">
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
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-lg -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-200 dark:bg-primary-800/30 rounded-lg -z-10" />
              
              {/* Image placeholder - replace with your photo */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center overflow-hidden">
                <div className="text-white text-center p-8">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-lg font-medium opacity-80">Tu foto aquí</p>
                </div>
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
            
            <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 text-lg">
              <p>
                ¡Hola! Soy Santiago, un desarrollador Full Stack apasionado por crear 
                experiencias digitales que no solo se vean bien, sino que también 
                funcionen de manera impecable.
              </p>
              <p>
                Mi viaje en el desarrollo comenzó hace varios años, y desde entonces 
                he tenido la oportunidad de trabajar en una variedad de proyectos, 
                desde startups hasta empresas establecidas.
              </p>
              <p>
                Cuando no estoy programando, me encontrarás explorando nuevas 
                tecnologías, contribuyendo a proyectos open source, o disfrutando 
                de un buen café mientras leo sobre las últimas tendencias en tech.
              </p>
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: '3+', label: 'Años de experiencia' },
                { value: '20+', label: 'Proyectos completados' },
                { value: '15+', label: 'Clientes satisfechos' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800"
                >
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

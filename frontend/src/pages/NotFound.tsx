import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* 404 */}
        <div className="text-[150px] md:text-[200px] font-bold text-gradient leading-none">
          404
        </div>

        {/* Message */}
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Página no encontrada
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Lo siento, la página que buscas no existe o ha sido movida a otra ubicación.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button size="lg">
              Volver al inicio
            </Button>
          </Link>
          <Link to="/#contact">
            <Button variant="outline" size="lg">
              Contáctame
            </Button>
          </Link>
        </div>

        {/* Fun illustration */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mt-12"
        >
          <svg
            className="w-48 h-48 mx-auto text-slate-300 dark:text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

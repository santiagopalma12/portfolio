import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import Input, { Textarea } from '../ui/Input'
import { sendContactMessage } from '../../services/contact'
import type { ContactForm } from '../../types/api'
import { SOCIAL_LINKS } from '../../utils/constants'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await sendContactMessage(data)
      console.log('Contact response:', response)
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Contact error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-950">
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
            <span className="text-gradient">Contáctame</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            ¿Tienes un proyecto en mente o simplemente quieres saludar? 
            Me encantaría escucharte.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Información de Contacto
            </h3>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Estoy disponible para proyectos freelance, colaboraciones o 
              simplemente para charlar sobre tecnología.
            </p>

            <div className="mt-8 space-y-6">
              {/* Email */}
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors group"
              >
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Email</div>
                  <div className="font-medium text-black dark:text-white">{SOCIAL_LINKS.email}</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors group"
              >
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">LinkedIn</div>
                  <div className="font-medium text-black dark:text-white">Santiago Enrique Palma Apaza</div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors group"
              >
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">GitHub</div>
                  <div className="font-medium text-black dark:text-white">@santiagopalma12</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Nombre"
                placeholder="Tu nombre"
                error={errors.name?.message}
                {...register('name', { required: 'El nombre es requerido' })}
              />

              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
              />

              <Input
                label="Asunto"
                placeholder="¿De qué quieres hablar?"
                error={errors.subject?.message}
                {...register('subject', { required: 'El asunto es requerido' })}
              />

              <Textarea
                label="Mensaje"
                placeholder="Cuéntame sobre tu proyecto..."
                rows={5}
                error={errors.message?.message}
                {...register('message', {
                  required: 'El mensaje es requerido',
                  minLength: {
                    value: 10,
                    message: 'El mensaje debe tener al menos 10 caracteres',
                  },
                })}
              />

              {submitStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  ¡Mensaje enviado correctamente! Te responderé pronto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                  Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                Enviar Mensaje
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

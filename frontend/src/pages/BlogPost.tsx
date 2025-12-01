import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mockPosts } from '../services/blog'
import { formatDate } from '../utils/formatDate'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = mockPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Artículo no encontrado
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            El artículo que buscas no existe o ha sido eliminado.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-primary-500 hover:text-primary-600"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <Link
                to="/#blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
              >
                ← Volver al blog
              </Link>
              
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-4">
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                <span>•</span>
                <span>{post.readTime} min de lectura</span>
                <span>•</span>
                <span>{post.views.toLocaleString()} vistas</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {post.title}
              </h1>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                  {post.author.name[0]}
                </div>
                <div>
                  <div className="font-medium text-white">{post.author.name}</div>
                  <div className="text-sm text-white/70">Autor</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-sm font-medium rounded-full"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </motion.div>

            {/* Article content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <p className="lead">{post.excerpt}</p>
              
              <h2>Introducción</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat.
              </p>

              <h2>Desarrollo</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <pre><code>{`// Ejemplo de código
function ejemplo() {
  console.log('Hola Mundo!');
}
`}</code></pre>

              <h2>Conclusión</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa 
                quae ab illo inventore veritatis et quasi architecto beatae vitae 
                dicta sunt explicabo.
              </p>
            </motion.div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Compartir este artículo
              </h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 hover:text-primary-500 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 hover:text-primary-500 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  )
}

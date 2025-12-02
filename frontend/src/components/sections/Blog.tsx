import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardImage, CardContent } from '../ui/Card'
import { getPosts, mockPosts } from '../../services/blog'
import { formatDate } from '../../utils/formatDate'
import type { BlogPost } from '../../types/blog'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts()
        if (data && data.length > 0) {
          setPosts(data)
        }
      } catch (error) {
        console.log('Using mock blog data')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section id="blog" className="section-padding bg-white dark:bg-slate-900">
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
            Mi <span className="text-gradient">Blog</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Artículos y tutoriales sobre desarrollo web, tecnología y mi 
            experiencia en la industria.
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="group h-full flex flex-col">
                <CardImage src={post.coverImage || ''} alt={post.title} />
                <CardContent className="flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    <span>•</span>
                    <span>{post.readTime} min de lectura</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 heading-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2.5 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${tag.color}20`,
                          color: tag.color,
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Read more */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      Leer más
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-500 border-2 border-primary-500 rounded-lg hover:bg-primary-500 hover:text-white transition-all"
          >
            Ver todos los artículos
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

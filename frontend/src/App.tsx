import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import { useThemeStore } from './stores/themeStore'

function App() {
  const { isDark } = useThemeStore()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App

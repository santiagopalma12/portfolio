import { useThemeStore } from '../stores/themeStore'
import { useEffect } from 'react'

export function useTheme() {
  const { isDark, toggleTheme, setTheme } = useThemeStore()

  useEffect(() => {
    // Check for system preference on mount
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set preference
      const stored = localStorage.getItem('theme-storage')
      if (!stored) {
        setTheme(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setTheme])

  return { isDark, toggleTheme, setTheme }
}

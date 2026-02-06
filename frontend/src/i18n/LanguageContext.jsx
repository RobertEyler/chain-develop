import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { translations, supportedLanguages, detectUserLanguage } from './translations'
import { setApiLanguage } from '../utils/api'
import { useSafeNavigate } from '../utils/useSafeNavigate'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const location = useLocation()
  const navigate = useSafeNavigate()
  const hasInitialized = useRef(false)
  
  // 从路径中提取语言
  const getLanguageFromPath = () => {
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    const firstSegment = segments[0]
    
    if (supportedLanguages.includes(firstSegment)) {
      return firstSegment
    }
    return 'en' // 默认英文
  }

  const [language, setLanguage] = useState(() => {
    // SSR 安全：初始状态只从路径获取
    // 在 SSR 时，detectUserLanguage 会返回 'en'，所以直接使用路径语言
    const pathLang = getLanguageFromPath()
    // 如果路径中有语言代码，使用它；否则默认英文（SSR 时）
    return pathLang
  })

  // 初始化：如果路径中没有语言代码，根据检测到的语言重定向（仅在客户端）
  useEffect(() => {
    // SSR 安全：只在客户端执行
    if (typeof window === 'undefined') {
      return
    }
    
    if (hasInitialized.current) {
      return
    }
    
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    
    // 如果路径中没有语言代码
    if (segments.length === 0 || !supportedLanguages.includes(segments[0])) {
      const detectedLang = detectUserLanguage()
      
      // 如果检测到的语言不是英文，且当前路径是根路径，则重定向
      if (detectedLang !== 'en' && path === '/') {
        hasInitialized.current = true
        navigate(`/${detectedLang}`, { replace: true })
        setLanguage(detectedLang)
        setApiLanguage(detectedLang)
        return
      }
    }
    
    hasInitialized.current = true
    const currentLang = getLanguageFromPath()
    setLanguage(currentLang)
    setApiLanguage(currentLang)
  }, [location.pathname]) // 依赖路径而不是 navigate，避免在 SSR 时访问 navigate

  // 当路径变化时更新语言
  useEffect(() => {
    if (!hasInitialized.current) {
      return
    }
    
    const newLang = getLanguageFromPath()
    if (newLang !== language) {
      setLanguage(newLang)
      setApiLanguage(newLang)
    }
  }, [location.pathname])

  // 切换语言
  const changeLanguage = (newLang) => {
    if (!supportedLanguages.includes(newLang)) {
      return
    }

    // 保存到 localStorage（仅在客户端）
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('preferredLanguage', newLang)
      } catch (e) {
        // localStorage 可能不可用
      }
    }

    // 获取当前路径（去掉语言前缀）
    const currentPath = location.pathname
    const segments = currentPath.split('/').filter(Boolean)
    
    // 如果第一个段是语言代码，移除它
    if (supportedLanguages.includes(segments[0])) {
      segments.shift()
    }
    
    // 构建新路径
    const newPath = newLang === 'en' 
      ? (segments.length > 0 ? `/${segments.join('/')}` : '/')
      : `/${newLang}${segments.length > 0 ? `/${segments.join('/')}` : ''}`
    
    // 导航到新路径
    navigate(newPath)
    setLanguage(newLang)
    setApiLanguage(newLang)
  }

  // 获取翻译
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`)
        return key
      }
    }
    
    // 允许返回数组，但不允许返回普通对象
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      console.error(`Translation key ${key} returned an object instead of a string or array`)
      return key
    }
    
    // 如果是数组，直接返回
    if (Array.isArray(value)) {
      return value
    }
    
    return String(value)
  }

  // 获取当前路径（不带语言前缀）
  const getPathWithoutLanguage = () => {
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    
    if (supportedLanguages.includes(segments[0])) {
      segments.shift()
    }
    
    return segments.length > 0 ? `/${segments.join('/')}` : '/'
  }

  // 获取带语言前缀的路径
  const getPathWithLanguage = (path, lang = language) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    if (lang === 'en') {
      return cleanPath ? `/${cleanPath}` : '/'
    }
    return cleanPath ? `/${lang}/${cleanPath}` : `/${lang}`
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        getPathWithoutLanguage,
        getPathWithLanguage,
        supportedLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

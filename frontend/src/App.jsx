import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from './i18n/LanguageContext'
import { setApiLanguage } from './utils/api'
import { useSafeNavigate } from './utils/useSafeNavigate'
import ScarcitySection from './components/ScarcitySection'
import AuthoritySection from './components/AuthoritySection'
import CommitmentSection from './components/CommitmentSection'
import ReciprocitySection from './components/ReciprocitySection'
import EasyAccessSection from './components/EasyAccessSection'
import AssessmentForm from './components/AssessmentForm'
import LanguageSwitcher from './components/LanguageSwitcher'

function HomePage() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <>
      <div id="scarcity">
        <ScarcitySection />
      </div>
      <div id="authority">
        <AuthoritySection />
      </div>
      <div id="commitment">
        <CommitmentSection />
      </div>
      <div id="reciprocity">
        <ReciprocitySection />
      </div>
      <div id="easy-access">
        <EasyAccessSection />
      </div>
    </>
  )
}

function Layout({ children }) {
  const { t, getPathWithLanguage } = useLanguage()
  const location = useLocation()
  const navigate = useSafeNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const isHomePage = location.pathname === '/' || 
    location.pathname === '/zh-CN' || 
    location.pathname === '/zh-TW' ||
    !location.pathname.includes('/assessment')

  // 滚动监听：向下滚动隐藏，向上滚动显示
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      
      // 在页面顶部时始终显示
      if (currentScrollY < 10) {
        setIsHeaderVisible(true)
      } else {
        // 向下滚动隐藏，向上滚动显示
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // 向下滚动超过 100px 时隐藏
          setIsHeaderVisible(false)
        } else if (currentScrollY < lastScrollY) {
          // 向上滚动时显示
          setIsHeaderVisible(true)
        }
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const goToHome = () => {
    const homePath = getPathWithLanguage('')
    navigate(homePath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-white/60 backdrop-blur-sm'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={goToHome}
            >
              <img 
                src="/White logo - no background.svg" 
                alt="BuildWeb3 Logo" 
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">{t('home.brand')}</div>
            </div>
            
            <div className="flex items-center gap-6">
              {/* 导航菜单 - 只在首页显示 */}
              {isHomePage && (
                <>
                  <nav className="hidden lg:flex items-center gap-8">
                    <a 
                      href="#scarcity" 
                      className="text-sm text-foreground-muted hover:text-primary transition-colors duration-200 tracking-wide"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('scarcity')
                      }}
                    >
                      {t('nav.limitedService')}
                    </a>
                    <a 
                      href="#authority" 
                      className="text-sm text-foreground-muted hover:text-primary transition-colors duration-200 tracking-wide"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('authority')
                      }}
                    >
                      {t('nav.whyChooseUs')}
                    </a>
                    <a 
                      href="#commitment" 
                      className="text-sm text-foreground-muted hover:text-primary transition-colors duration-200 tracking-wide"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('commitment')
                      }}
                    >
                      {t('nav.beforeStart')}
                    </a>
                    <a 
                      href="#reciprocity" 
                      className="text-sm text-foreground-muted hover:text-primary transition-colors duration-200 tracking-wide"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('reciprocity')
                      }}
                    >
                      {t('nav.whatWeCanDo')}
                    </a>
                    <a 
                      href="#easy-access" 
                      className="text-sm text-foreground-muted hover:text-primary transition-colors duration-200 tracking-wide"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('easy-access')
                      }}
                    >
                      {t('nav.startNow')}
                    </a>
                  </nav>

                  {/* 移动端菜单按钮 */}
                  <button 
                    className="lg:hidden text-foreground-muted hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </>
              )}
              
              {/* 语言切换器 */}
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* 移动端菜单 - 只在首页显示 */}
          {isHomePage && mobileMenuOpen && (
            <nav className="lg:hidden mt-6 pb-4 border-t border-border pt-6">
              <div className="flex flex-col gap-4">
                <a 
                  href="#scarcity" 
                  className="text-foreground-muted hover:text-primary transition-colors duration-200 py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('scarcity')
                  }}
                >
                  {t('nav.limitedService')}
                </a>
                <a 
                  href="#authority" 
                  className="text-foreground-muted hover:text-primary transition-colors duration-200 py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('authority')
                  }}
                >
                  {t('nav.whyChooseUs')}
                </a>
                <a 
                  href="#commitment" 
                  className="text-foreground-muted hover:text-primary transition-colors duration-200 py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('commitment')
                  }}
                >
                  {t('nav.beforeStart')}
                </a>
                <a 
                  href="#reciprocity" 
                  className="text-foreground-muted hover:text-primary transition-colors duration-200 py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('reciprocity')
                  }}
                >
                  {t('nav.whatWeCanDo')}
                </a>
                <a 
                  href="#easy-access" 
                  className="text-foreground-muted hover:text-primary transition-colors duration-200 py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('easy-access')
                  }}
                >
                  {t('nav.startNow')}
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 pt-20">
        {children}
      </main>

      <footer className="bg-foreground text-white py-16 mt-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="/White logo - no background.svg" 
                alt="BuildWeb3 Logo" 
                className="h-10 w-auto"
              />
              <span className="text-white/80 text-sm font-medium">{t('home.brand')}</span>
            </div>
            <p className="text-white/60 text-sm">&copy; 2026 {t('home.brand')}. {t('common.allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function AppContent() {
  const { t, language } = useLanguage()
  const location = useLocation()

  // 更新 API 语言
  useEffect(() => {
    setApiLanguage(language)
  }, [language])

  // 获取当前页面的路径（不含语言前缀）
  const getPathWithoutLanguage = () => {
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    // 如果第一个段是语言代码，移除它
    if (segments.length > 0 && ['en', 'zh-CN', 'zh-TW'].includes(segments[0])) {
      return '/' + segments.slice(1).join('/')
    }
    return path
  }

  // 获取网站基础 URL（实际部署时需要替换）
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://buildweb3.com'
  const pathWithoutLang = getPathWithoutLanguage()
  
  // 生成所有语言版本的 URL
  const urls = {
    en: `${baseUrl}${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
    'zh-CN': `${baseUrl}/zh-CN${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
    'zh-TW': `${baseUrl}/zh-TW${pathWithoutLang === '/' ? '' : pathWithoutLang}`,
  }

  // 当前语言的规范 URL
  const canonicalUrl = urls[language]

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
        <meta name="keywords" content={t('home.keywords')} />
        
        {/* Canonical URL - 防止重复内容 */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang 标签 - 告诉搜索引擎不同语言版本的关系 */}
        <link rel="alternate" hrefLang="en" href={urls.en} />
        <link rel="alternate" hrefLang="zh-Hans" href={urls['zh-CN']} />
        <link rel="alternate" hrefLang="zh-Hant" href={urls['zh-TW']} />
        <link rel="alternate" hrefLang="x-default" href={urls.en} />
        
        {/* Open Graph */}
        <meta property="og:title" content={t('home.title')} />
        <meta property="og:description" content={t('home.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={language === 'zh-CN' ? 'zh_CN' : language === 'zh-TW' ? 'zh_TW' : 'en_US'} />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="zh_TW" />
        
        {/* Icons */}
        <link rel="icon" type="image/png" href="/browser.png" />
        <link rel="apple-touch-icon" href="/iPhone.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/Android.png" />
      </Helmet>
      
      <Layout>
        <Routes>
          {/* 英文路由 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentForm />} />
          
          {/* 简体中文路由 */}
          <Route path="/zh-CN" element={<HomePage />} />
          <Route path="/zh-CN/assessment" element={<AssessmentForm />} />
          
          {/* 繁体中文路由 */}
          <Route path="/zh-TW" element={<HomePage />} />
          <Route path="/zh-TW/assessment" element={<AssessmentForm />} />
        </Routes>
      </Layout>
    </>
  )
}

export default AppContent

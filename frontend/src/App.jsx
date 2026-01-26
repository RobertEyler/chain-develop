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
  
  const isHomePage = location.pathname === '/' || 
    location.pathname === '/zh-CN' || 
    location.pathname === '/zh-TW' ||
    !location.pathname.includes('/assessment')

  // 滚动监听：向下滚动隐藏，向上滚动显示
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
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
    <div className="min-h-screen flex flex-col">
      <header 
        className={`bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={goToHome}
            >
              <img 
                src="/White logo - no background.svg" 
                alt="BuildWeb3 Logo" 
                className="h-16 md:h-20 w-auto"
              />
              <div className="text-2xl md:text-3xl font-bold">{t('home.brand')}</div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* 导航菜单 - 只在首页显示 */}
              {isHomePage && (
                <>
                  <nav className="hidden md:flex items-center gap-6">
                    <a 
                      href="#scarcity" 
                      className="hover:text-indigo-200 transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('scarcity')
                      }}
                    >
                      {t('nav.limitedService')}
                    </a>
                    <a 
                      href="#authority" 
                      className="hover:text-indigo-200 transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('authority')
                      }}
                    >
                      {t('nav.whyChooseUs')}
                    </a>
                    <a 
                      href="#commitment" 
                      className="hover:text-indigo-200 transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('commitment')
                      }}
                    >
                      {t('nav.beforeStart')}
                    </a>
                    <a 
                      href="#reciprocity" 
                      className="hover:text-indigo-200 transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('reciprocity')
                      }}
                    >
                      {t('nav.whatWeCanDo')}
                    </a>
                    <a 
                      href="#easy-access" 
                      className="hover:text-indigo-200 transition-colors duration-200"
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
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            <nav className="md:hidden mt-4 pb-4 border-t border-indigo-400 pt-4">
              <div className="flex flex-col gap-4">
                <a 
                  href="#scarcity" 
                  className="hover:text-indigo-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('scarcity')
                  }}
                >
                  {t('nav.limitedService')}
                </a>
                <a 
                  href="#authority" 
                  className="hover:text-indigo-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('authority')
                  }}
                >
                  {t('nav.whyChooseUs')}
                </a>
                <a 
                  href="#commitment" 
                  className="hover:text-indigo-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('commitment')
                  }}
                >
                  {t('nav.beforeStart')}
                </a>
                <a 
                  href="#reciprocity" 
                  className="hover:text-indigo-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('reciprocity')
                  }}
                >
                  {t('nav.whatWeCanDo')}
                </a>
                <a 
                  href="#easy-access" 
                  className="hover:text-indigo-200 transition-colors duration-200"
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

      <main className="flex-1 py-12 md:py-16">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center mt-16">
        <div className="max-w-6xl mx-auto px-5">
          <p>&copy; 2026 {t('home.brand')}. {t('common.allRightsReserved')}</p>
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

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
        <meta name="keywords" content={t('home.keywords')} />
        <meta property="og:title" content={t('home.title')} />
        <meta property="og:description" content={t('home.description')} />
        <meta property="og:type" content="website" />
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

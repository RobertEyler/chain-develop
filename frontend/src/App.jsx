import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ScarcitySection from './components/ScarcitySection'
import AuthoritySection from './components/AuthoritySection'
import CommitmentSection from './components/CommitmentSection'
import ReciprocitySection from './components/ReciprocitySection'
import EasyAccessSection from './components/EasyAccessSection'
import AssessmentForm from './components/AssessmentForm'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // 检查URL路径来决定显示哪个页面（支持路径路由和hash路由）
    const checkRoute = () => {
      const pathname = window.location.pathname
      const hash = window.location.hash
      
      // 支持路径路由：/assessment 或 hash路由：#assessment
      if (pathname === '/assessment' || pathname.startsWith('/assessment/') || hash === '#assessment') {
        setCurrentPage('assessment')
      } else {
        setCurrentPage('home')
      }
    }

    // 初始检查
    checkRoute()

    // 监听路径和hash变化
    const handleLocationChange = () => {
      checkRoute()
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const goToHome = () => {
    // 使用 history API 进行流畅的页面切换
    window.history.pushState({}, '', '/')
    setCurrentPage('home')
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      <Helmet>
        <title>链道 - Web3项目技术评估</title>
        <meta name="description" content="每月最多支持5个Web3项目，提供专业的技术评估和咨询服务。2分钟获取评估，查看示例报告。" />
        <meta name="keywords" content="Web3,区块链,技术评估,项目咨询,区块链开发" />
        <meta property="og:title" content="链道 - Web3项目技术评估" />
        <meta property="og:description" content="每月最多支持5个Web3项目，提供专业的技术评估和咨询服务" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={goToHome}
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <div className="text-2xl md:text-3xl font-bold">链道</div>
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              
              <div className="flex items-center gap-4">
                {/* 导航菜单 - 只在首页显示 */}
                {currentPage === 'home' && (
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
                  限量服务
                </a>
                <a 
                  href="#authority" 
                  className="hover:text-indigo-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('authority')
                  }}
                >
                  为什么选择我们
                </a>
                <a 
                  href="#commitment" 
                  className="hover:text-indigo-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('commitment')
                  }}
                >
                  开始之前
                </a>
                <a 
                  href="#reciprocity" 
                  className="hover:text-indigo-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('reciprocity')
                  }}
                >
                  我们能做什么
                </a>
                <a 
                  href="#easy-access" 
                  className="hover:text-indigo-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('easy-access')
                  }}
                >
                  立即开始
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
              </div>
            </div>
            
            {/* 移动端菜单 - 只在首页显示 */}
            {currentPage === 'home' && mobileMenuOpen && (
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
                    限量服务
                  </a>
                  <a 
                    href="#authority" 
                    className="hover:text-indigo-200 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('authority')
                    }}
                  >
                    为什么选择我们
                  </a>
                  <a 
                    href="#commitment" 
                    className="hover:text-indigo-200 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('commitment')
                    }}
                  >
                    开始之前
                  </a>
                  <a 
                    href="#reciprocity" 
                    className="hover:text-indigo-200 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('reciprocity')
                    }}
                  >
                    我们能做什么
                  </a>
                  <a 
                    href="#easy-access" 
                    className="hover:text-indigo-200 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('easy-access')
                    }}
                  >
                    立即开始
                  </a>
                </div>
              </nav>
            )}
          </div>
        </header>

        <main className="flex-1 py-12 md:py-16">
          {currentPage === 'assessment' ? (
            <AssessmentForm />
          ) : (
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
          )}
        </main>

        <footer className="bg-gray-800 text-white py-8 text-center mt-16">
          <div className="max-w-6xl mx-auto px-5">
            <p>&copy; 2026 链道. 保留所有权利.</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App

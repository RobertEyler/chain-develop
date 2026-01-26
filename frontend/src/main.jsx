import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { LanguageProvider } from './i18n/LanguageContext'
import App from './App'
import './index.css'

// SSR 时使用 StaticRouter，客户端使用 BrowserRouter
function Router({ children }) {
  if (typeof window !== 'undefined') {
    return <BrowserRouter>{children}</BrowserRouter>
  }
  // SSR 时使用 StaticRouter，传入默认 location
  // vite-react-ssg 会为每个路由单独渲染，所以这里使用默认值即可
  return <StaticRouter location="/">{children}</StaticRouter>
}

export const createRoot = ViteReactSSG(
  <HelmetProvider>
    <Router>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </Router>
  </HelmetProvider>
)

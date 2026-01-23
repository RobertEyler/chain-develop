import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

export const createRoot = ViteReactSSG(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)

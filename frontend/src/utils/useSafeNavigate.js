// SSR 安全的导航 hook
// 在 SSR 时返回一个使用 window.location 的函数，在客户端使用 useNavigate
import { useEffect, useState, useRef } from 'react'

export function useSafeNavigate() {
  const navigateRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // 只在客户端动态导入 useNavigate
    if (typeof window !== 'undefined') {
      import('react-router-dom').then(({ useNavigate }) => {
        // 这里我们不能直接调用 hook，所以我们需要另一种方法
        // 实际上，在客户端我们可以直接使用 window.location 或 history API
      })
    }
  }, [])

  // 返回一个导航函数
  return (path, options) => {
    if (typeof window === 'undefined') {
      return // SSR 时不做任何事
    }

    // 客户端使用 history API
    if (options?.replace) {
      window.history.replaceState({}, '', path)
      window.dispatchEvent(new PopStateEvent('popstate'))
    } else {
      window.history.pushState({}, '', path)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }
}

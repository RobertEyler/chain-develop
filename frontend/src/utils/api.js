// API 工具函数，自动添加语言请求头

let currentLanguage = 'en'

// 设置当前语言（由 LanguageContext 调用）
export function setApiLanguage(lang) {
  currentLanguage = lang
}

// 获取 API 基础 URL
export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL || 'http://localhost:3000'
}

// 带语言头的 fetch 封装
export async function apiFetch(url, options = {}) {
  const apiBaseUrl = getApiBaseUrl()
  const fullUrl = url.startsWith('http') ? url : `${apiBaseUrl}${url}`
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': currentLanguage, // 添加语言请求头
    ...options.headers,
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  })

  return response
}

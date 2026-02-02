import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { languageNames } from '../i18n/translations'

function LanguageSwitcher() {
  const { language, changeLanguage, supportedLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-tertiary border border-border hover:border-border-hover transition-all duration-200 text-foreground-muted hover:text-foreground"
        aria-label="Change language"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="hidden md:inline text-sm">{languageNames[language]}</span>
        <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉菜单 */}
          <div className="absolute right-0 mt-2 w-44 glass-card rounded-xl shadow-2xl z-50 overflow-hidden border border-border">
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-3 transition-colors duration-200 flex items-center gap-3 ${
                  language === lang 
                    ? 'bg-primary-muted text-primary' 
                    : 'text-foreground-muted hover:bg-background-tertiary hover:text-foreground'
                }`}
              >
                {language === lang && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className={language !== lang ? 'ml-7' : ''}>{languageNames[lang]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitcher

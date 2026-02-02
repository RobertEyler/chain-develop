import { useLanguage } from '../i18n/LanguageContext'
import { useSafeNavigate } from '../utils/useSafeNavigate'

function EasyAccessSection() {
  const { t, getPathWithLanguage } = useLanguage()
  const navigate = useSafeNavigate()

  const goToAssessment = () => {
    navigate(getPathWithLanguage('assessment'))
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">{t('easyAccess.title')}</h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">{t('easyAccess.subtitle') || 'Choose the plan that works best for you'}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
            <div className="relative glass-card rounded-2xl p-8 h-full flex flex-col bg-background">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted border border-border-accent mb-6 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-xs text-primary font-medium">{t('easyAccess.recommended') || 'Recommended'}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{t('easyAccess.getImmediately.title')}</h3>
              <p className="text-foreground-muted mb-8 flex-1">{t('easyAccess.getImmediately.desc')}</p>
              <button 
                onClick={goToAssessment}
                className="w-full btn-primary py-4 rounded-xl font-semibold"
              >
                {t('easyAccess.getImmediately.button')}
              </button>
            </div>
          </div>
          
          {/* Secondary Card */}
          <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">{t('easyAccess.contactUs.title')}</h3>
            <p className="text-foreground-muted mb-8 flex-1">{t('easyAccess.contactUs.desc')}</p>
            <a
              href={import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/your_telegram_username'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full btn-secondary py-4 rounded-xl font-semibold">
                {t('easyAccess.contactUs.button')}
              </button>
            </a>
          </div>
          
          {/* Tertiary Card */}
          <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-background-tertiary flex items-center justify-center mb-6 border border-border">
              <svg className="w-5 h-5 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">{t('easyAccess.custom.title')}</h3>
            <p className="text-foreground-muted mb-8 flex-1">{t('easyAccess.custom.desc')}</p>
            <a
              href={import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/your_telegram_username'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full py-4 rounded-xl font-semibold bg-background-tertiary text-foreground-muted border border-border hover:border-border-hover hover:text-foreground transition-all">
                {t('easyAccess.custom.button')}
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EasyAccessSection

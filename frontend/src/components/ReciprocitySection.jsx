import { useLanguage } from '../i18n/LanguageContext'
import { useSafeNavigate } from '../utils/useSafeNavigate'

function ReciprocitySection() {
  const { t, getPathWithLanguage } = useLanguage()
  const navigate = useSafeNavigate()

  const goToAssessment = () => {
    navigate(getPathWithLanguage('assessment'))
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background-secondary">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-primary/8 blur-[100px] rounded-full"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-accent/8 blur-[100px] rounded-full"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">{t('reciprocity.title')}</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-10 mb-8">
            <p className="text-lg md:text-xl text-foreground-muted font-medium text-center mb-8 leading-relaxed">
              {t('reciprocity.description')}
            </p>
            
            <div className="space-y-4">
              {t('reciprocity.benefits').map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border hover:border-border-hover transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={goToAssessment}
            className="w-full btn-primary rounded-xl p-5 text-lg font-semibold group"
          >
            <span className="flex items-center justify-center gap-3">
              {t('reciprocity.getFreeAssessment')}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReciprocitySection

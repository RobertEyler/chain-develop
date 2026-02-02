import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function ScarcitySection() {
  const { t, language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [deadlineDate, setDeadlineDate] = useState('')

  useEffect(() => {
    // 计算下个月的一号 23:59:59
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 23, 59, 59)
    const deadline = nextMonth.getTime()
    
    // 格式化日期显示
    const year = nextMonth.getFullYear()
    const month = nextMonth.getMonth() + 1
    const day = nextMonth.getDate()
    
    if (language === 'en') {
      setDeadlineDate(`${month}/${day}/${year}`)
    } else {
      setDeadlineDate(`${year}年${month}月${day}日`)
    }

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = deadline - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [language])

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-muted border border-border-accent mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm text-primary font-medium tracking-wide">{t('scarcity.badge') || 'Limited Availability'}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
            {t('scarcity.title')}
          </h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
              {language === 'en' 
                ? <>We support a maximum of <span className="font-semibold text-primary text-2xl">5</span> Web3 projects per month to ensure sufficient investment in each project.</>
                : language === 'zh-CN'
                ? <>我们每月最多支持 <span className="font-semibold text-primary text-2xl">5 个 Web3 项目</span>，以保证每个项目都有足够投入。</>
                : <>我們每月最多支持 <span className="font-semibold text-primary text-2xl">5 個 Web3 項目</span>，以保證每個項目都有足夠投入。</>
              }
            </p>
            
            {/* Countdown Timer */}
            <div className="glass-card rounded-2xl p-8 md:p-10 max-w-2xl mx-auto">
              <p className="text-foreground-muted mb-6 text-lg font-medium">{t('scarcity.countdown')}</p>
              <div className="flex gap-3 md:gap-4 justify-center">
                <div className="flex flex-col items-center">
                  <div className="bg-background-tertiary rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] border border-border">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">{timeLeft.days}</div>
                  </div>
                  <div className="text-xs md:text-sm text-foreground-subtle mt-2 uppercase tracking-wider">{t('scarcity.days')}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-background-tertiary rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] border border-border">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">{String(timeLeft.hours).padStart(2, '0')}</div>
                  </div>
                  <div className="text-xs md:text-sm text-foreground-subtle mt-2 uppercase tracking-wider">{t('scarcity.hours')}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-background-tertiary rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] border border-border">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  </div>
                  <div className="text-xs md:text-sm text-foreground-subtle mt-2 uppercase tracking-wider">{t('scarcity.minutes')}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-background-tertiary rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] border border-border">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  </div>
                  <div className="text-xs md:text-sm text-foreground-subtle mt-2 uppercase tracking-wider">{t('scarcity.seconds')}</div>
                </div>
              </div>
              <p className="text-sm text-foreground-subtle mt-6">{t('scarcity.deadline')}{deadlineDate}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScarcitySection

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
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{t('scarcity.title')}</h2>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {language === 'en' 
                ? <>We support a maximum of <span className="font-bold text-indigo-600 text-2xl">5</span> Web3 projects per month to ensure sufficient investment in each project.</>
                : language === 'zh-CN'
                ? <>我们每月最多支持 <span className="font-bold text-indigo-600 text-2xl">5 个 Web3 项目</span>，以保证每个项目都有足够投入。</>
                : <>我們每月最多支持 <span className="font-bold text-indigo-600 text-2xl">5 個 Web3 項目</span>，以保證每個項目都有足夠投入。</>
              }
            </p>
            <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6 md:p-8 shadow-md">
              <p className="text-gray-600 mb-4 text-lg font-semibold">{t('scarcity.countdown')}</p>
              <div className="flex gap-3 md:gap-4 justify-center">
                <div className="bg-white rounded-lg p-3 md:p-4 shadow-md min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-3xl font-bold text-red-600">{timeLeft.days}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">{t('scarcity.days')}</div>
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 shadow-md min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-3xl font-bold text-red-600">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">{t('scarcity.hours')}</div>
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 shadow-md min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-3xl font-bold text-red-600">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">{t('scarcity.minutes')}</div>
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 shadow-md min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-3xl font-bold text-red-600">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">{t('scarcity.seconds')}</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">{t('scarcity.deadline')}{deadlineDate}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScarcitySection

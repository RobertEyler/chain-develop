import { useLanguage } from '../i18n/LanguageContext'
import { useSafeNavigate } from '../utils/useSafeNavigate'

function EasyAccessSection() {
  const { t, getPathWithLanguage } = useLanguage()
  const navigate = useSafeNavigate()

  const goToAssessment = () => {
    navigate(getPathWithLanguage('assessment'))
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">{t('easyAccess.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-3">{t('easyAccess.getImmediately.title')}</h3>
            <p className="text-indigo-100 mb-6">{t('easyAccess.getImmediately.desc')}</p>
            <button 
              onClick={goToAssessment}
              className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              {t('easyAccess.getImmediately.button')}
            </button>
          </div>
          
          <div className="bg-white border-2 border-indigo-200 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('easyAccess.contactUs.title')}</h3>
            <p className="text-gray-600 mb-6">{t('easyAccess.contactUs.desc')}</p>
            <a
              href={import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/your_telegram_username'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full border-2 border-indigo-600 text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                {t('easyAccess.contactUs.button')}
              </button>
            </a>
          </div>
          
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('easyAccess.custom.title')}</h3>
            <p className="text-gray-600 mb-6">{t('easyAccess.custom.desc')}</p>
            <a
              href={import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/your_telegram_username'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full border-2 border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
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

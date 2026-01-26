import { useLanguage } from '../i18n/LanguageContext'
import { useSafeNavigate } from '../utils/useSafeNavigate'

function ReciprocitySection() {
  const { t, getPathWithLanguage } = useLanguage()
  const navigate = useSafeNavigate()

  const goToAssessment = () => {
    navigate(getPathWithLanguage('assessment'))
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">{t('reciprocity.title')}</h2>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            {t('reciprocity.description')}
          </p>
          <ul className="space-y-3 text-left bg-white rounded-lg p-6 shadow-md">
            {t('reciprocity.benefits').map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-indigo-600 text-xl font-bold mt-1">•</span>
                <span className="text-base md:text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={goToAssessment}
            className="w-full bg-indigo-600 text-white rounded-lg p-6 shadow-lg hover:bg-indigo-700 transition-colors duration-200 transform hover:scale-105"
          >
            <p className="text-lg md:text-xl font-semibold">{t('reciprocity.getFreeAssessment')}</p>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReciprocitySection

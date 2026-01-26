import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useSafeNavigate } from '../utils/useSafeNavigate'

function CommitmentSection() {
  const { t, getPathWithLanguage } = useLanguage()
  const navigate = useSafeNavigate()
  
  const steps = [
    {
      title: t('commitment.transparency.title'),
      options: t('commitment.transparency.options'),
    },
    {
      title: t('commitment.role.title'),
      options: t('commitment.role.options'),
    },
    {
      title: t('commitment.goal.title'),
      options: t('commitment.goal.options'),
    },
    {
      title: t('commitment.preparation.title'),
      options: t('commitment.preparation.options'),
    },
    {
      title: t('commitment.action.title'),
      options: t('commitment.action.options'),
    },
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({})

  const handleOptionSelect = (stepIndex, optionIndex) => {
    setSelectedOptions(prev => {
      return {
        ...prev,
        [stepIndex]: prev[stepIndex] === optionIndex ? null : optionIndex
      }
    })
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepSelection = selectedOptions[currentStep]
  const hasSelection = currentStepSelection !== null && currentStepSelection !== undefined
  const isLastStep = currentStep === steps.length - 1
  const completedSteps = Object.keys(selectedOptions).filter(
    step => selectedOptions[step] !== null && selectedOptions[step] !== undefined
  ).length
  const allStepsCompleted = completedSteps === steps.length

  const goToAssessment = () => {
    navigate(getPathWithLanguage('assessment'))
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">{t('commitment.title')}</h2>
        
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">{t('commitment.step')} {currentStep + 1} {t('commitment.of')} {steps.length}</span>
            <span className="text-sm text-gray-600">{t('commitment.completed')} {completedSteps} {t('commitment.of')} {steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 当前步骤 */}
        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
            {steps[currentStep].title}
          </h3>
          
          <div className="space-y-3">
            {steps[currentStep].options.map((option, optionIndex) => {
              const isSelected = currentStepSelection === optionIndex
              return (
                <button
                  key={optionIndex}
                  onClick={() => handleOptionSelect(currentStep, optionIndex)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className={`text-base md:text-lg ${
                      isSelected ? 'text-indigo-900 font-medium' : 'text-gray-700'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t('common.prev')}
          </button>
          
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-indigo-600 w-8'
                    : index < currentStep || (selectedOptions[index] !== null && selectedOptions[index] !== undefined)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
                title={`${t('commitment.step')} ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (allStepsCompleted && isLastStep) {
                goToAssessment()
              } else {
                handleNextStep()
              }
            }}
            disabled={!hasSelection || (isLastStep && !allStepsCompleted)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              !hasSelection || (isLastStep && !allStepsCompleted)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {allStepsCompleted && isLastStep ? t('commitment.getFreeAssessment') : isLastStep ? t('common.submit') : t('common.next')}
          </button>
        </div>

        {/* 完成提示 */}
        {allStepsCompleted && isLastStep && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">{t('commitment.allStepsCompleted')}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CommitmentSection

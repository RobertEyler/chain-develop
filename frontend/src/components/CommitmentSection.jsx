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
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[100px] rounded-full"></div>
      
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">{t('commitment.title')}</h2>
          <p className="text-foreground-muted">{t('commitment.subtitle') || 'Answer a few questions to get started'}</p>
        </div>
        
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-foreground-muted">{t('commitment.step')} {currentStep + 1} {t('commitment.of')} {steps.length}</span>
            <span className="text-sm text-foreground-subtle">{t('commitment.completed')} {completedSteps} {t('commitment.of')} {steps.length}</span>
          </div>
          <div className="w-full bg-background-tertiary rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 当前步骤 */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center">
            {steps[currentStep].title}
          </h3>
          
          <div className="space-y-3">
            {steps[currentStep].options.map((option, optionIndex) => {
              const isSelected = currentStepSelection === optionIndex
              return (
                <button
                  key={optionIndex}
                  onClick={() => handleOptionSelect(currentStep, optionIndex)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary-muted'
                      : 'border-border bg-background-tertiary hover:border-border-hover'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary'
                          : 'border-foreground-subtle'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-background"></div>
                      )}
                    </div>
                    <span className={`text-base ${
                      isSelected ? 'text-foreground font-medium' : 'text-foreground-muted'
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
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 0
                ? 'bg-background-tertiary text-foreground-subtle cursor-not-allowed'
                : 'bg-background-tertiary text-foreground-muted hover:text-foreground border border-border hover:border-border-hover'
            }`}
          >
            {t('common.prev')}
          </button>
          
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-primary w-8'
                    : index < currentStep || (selectedOptions[index] !== null && selectedOptions[index] !== undefined)
                    ? 'bg-primary/50 w-2'
                    : 'bg-border-hover w-2 hover:bg-foreground-subtle'
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
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              !hasSelection || (isLastStep && !allStepsCompleted)
                ? 'bg-background-tertiary text-foreground-subtle cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {allStepsCompleted && isLastStep ? t('commitment.getFreeAssessment') : isLastStep ? t('common.submit') : t('common.next')}
          </button>
        </div>

        {/* 完成提示 */}
        {allStepsCompleted && isLastStep && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 bg-primary-muted border border-border-accent px-6 py-4 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium text-foreground">{t('commitment.allStepsCompleted')}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CommitmentSection

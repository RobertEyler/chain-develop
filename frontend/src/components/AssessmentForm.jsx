import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useLanguage } from '../i18n/LanguageContext'
import { useSafeNavigate } from '../utils/useSafeNavigate'
import { apiFetch } from '../utils/api'

function AssessmentForm() {
  const { t, getPathWithLanguage } = useLanguage()
  const navigate = useSafeNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  
  const steps = [
    {
      title: t('assessment.questions.chain.title'),
      options: t('assessment.questions.chain.options'),
    },
    {
      title: t('assessment.questions.projectType.title'),
      options: t('assessment.questions.projectType.options'),
    },
    {
      title: t('assessment.questions.revenueSource.title'),
      options: t('assessment.questions.revenueSource.options'),
    },
    {
      title: t('assessment.questions.projectStage.title'),
      options: t('assessment.questions.projectStage.options'),
    },
    {
      title: t('assessment.questions.coreGoal.title'),
      options: t('assessment.questions.coreGoal.options'),
    },
    {
      title: t('assessment.questions.riskPreference.title'),
      options: t('assessment.questions.riskPreference.options'),
    },
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [projectDescription, setProjectDescription] = useState('')


  const handleOptionSelect = (stepIndex, optionIndex) => {
    setSelectedOptions(prev => {
      return {
        ...prev,
        [stepIndex]: prev[stepIndex] === optionIndex ? null : optionIndex
      }
    })
  }

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // 如果是最后一步（项目简介），自动提交
      handleSubmit()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // 检查是否所有步骤都已完成
    const allStepsFilled = steps.every((_, index) => 
      selectedOptions[index] !== null && selectedOptions[index] !== undefined
    )

    if (!allStepsFilled) {
      console.warn('请完成所有问题')
      return
    }

    // 检查项目简介是否已填写（可选，但建议填写）
    if (!projectDescription || projectDescription.trim() === '') {
      console.warn('建议填写项目简介以获得更准确的评估')
    }

    setSubmitting(true)
    setIsStreaming(true)
    setShowResult(true)
    setAssessmentResult('') // 清空之前的结果
    
    try {
      // 将选项索引转换为对应的值
      const assessmentData = {
        chain: selectedOptions[0] + 1,
        projectType: selectedOptions[1] + 1,
        revenueSource: selectedOptions[2] + 1,
        projectStage: selectedOptions[3] + 1,
        coreGoal: selectedOptions[4] + 1,
        riskPreference: selectedOptions[5] + 1,
        projectDescription: projectDescription.trim() || ''
      }
      
      console.log('Submitting assessment data:', assessmentData)
      
      // 提交评估（流式输出）
      const response = await apiFetch('/assessment', {
        method: 'POST',
        body: JSON.stringify(assessmentData),
      })
      
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (!response.ok) {
        // 尝试解析错误响应
        let errorData = null
        try {
          const errorText = await response.text()
          errorData = JSON.parse(errorText)
        } catch (e) {
          // 如果不是 JSON，使用原始文本
        }
        
        // 如果是限流错误（429），显示友好提示
        if (response.status === 429 && errorData) {
          setShowResult(true)
          setAssessmentResult(`## ${t('errors.rateLimit')}\n\n**${errorData.message}**\n\n${errorData.tip ? `${errorData.tip}` : `${t('errors.rateLimitTip')}`}\n\n---\n\n### ${t('assessment.moreAssessment')}\n\n${t('assessment.contactProfessional')}`)
          setIsStreaming(false)
          setSubmitting(false)
          return
        }
        
        console.error('HTTP error:', response.status, errorData)
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`)
      }
      
      // 读取流式数据
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          console.log('Stream completed')
          break
        }
        
        // 解码数据
        buffer += decoder.decode(value, { stream: true })
        
        // 处理 Server-Sent Events 格式
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || '' // 保留最后一个不完整的行
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.error) {
                console.error('Stream error:', data.error)
                setIsStreaming(false)
                setSubmitting(false)
                return
              }
              
              if (data.done) {
                console.log('Stream done')
                setIsStreaming(false)
                setSubmitting(false)
                return
              }
              
              if (data.content) {
                // 逐字追加内容
                setAssessmentResult(prev => prev + data.content)
              }
            } catch (e) {
              console.warn('Failed to parse SSE data:', line, e)
            }
          }
        }
      }
      
      setIsStreaming(false)
      setSubmitting(false)
    } catch (error) {
      console.error('提交失败:', error)
      setIsStreaming(false)
      setSubmitting(false)
    }
  }

  const currentStepSelection = selectedOptions[currentStep]
  const hasSelection = currentStep === steps.length ? true : (currentStepSelection !== null && currentStepSelection !== undefined)
  const isLastStep = currentStep === steps.length // 最后一步是项目简介
  const completedSteps = Object.keys(selectedOptions).filter(
    step => selectedOptions[step] !== null && selectedOptions[step] !== undefined
  ).length
  const allStepsCompleted = completedSteps === steps.length

  return (
    <section className="relative py-12 md:py-16 min-h-screen overflow-hidden bg-gradient-to-b from-background-secondary to-white">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 blur-[120px] rounded-full"></div>
      
      <div className="relative max-w-4xl mx-auto px-6">
        {/* 返回首页按钮 */}
        <div className="mb-8">
          <button
            onClick={() => {
              navigate(getPathWithLanguage(''))
            }}
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">{t('common.backToHome')}</span>
          </button>
        </div>
        
        {!showResult && (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">{t('assessment.title')}</h1>
              <p className="text-foreground-muted">{t('assessment.subtitle')}</p>
            </div>
            
            {/* 进度条 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-foreground-muted">{t('assessment.step')} {currentStep + 1} {t('assessment.of')} {steps.length + 1}</span>
                <span className="text-sm text-foreground-subtle">{t('assessment.completed')} {completedSteps} {t('assessment.of')} {steps.length}</span>
              </div>
              <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / (steps.length + 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 当前步骤 */}
            <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center">
                {currentStep === steps.length ? t('assessment.projectDescription') : steps[currentStep].title}
              </h3>
              
              {currentStep === steps.length ? (
                // 项目简介文本输入
                <div className="space-y-4">
                  <p className="text-foreground-muted text-center mb-6">
                    {t('assessment.projectDescriptionHint')}
                  </p>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder={t('assessment.projectDescriptionPlaceholder')}
                    className="w-full h-48 p-5 bg-white border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all resize-none text-foreground placeholder:text-foreground-subtle"
                  />
                  <div className="text-sm text-foreground-subtle text-right">
                    {projectDescription.length} {t('assessment.characters')}
                  </div>
                </div>
              ) : (
                // 选择题选项
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
                            : 'border-border bg-white hover:border-border-hover'
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
              )}
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 0
                    ? 'bg-white text-foreground-subtle cursor-not-allowed'
                    : 'bg-white text-foreground-muted hover:text-foreground border border-border hover:border-border-hover'
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
                    title={`Step ${index + 1}`}
                  />
                ))}
                {/* 项目简介步骤指示器 */}
                <button
                  onClick={() => setCurrentStep(steps.length)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep === steps.length
                      ? 'bg-primary w-8'
                      : projectDescription.trim() !== ''
                      ? 'bg-primary/50 w-2'
                      : 'bg-border-hover w-2 hover:bg-foreground-subtle'
                  }`}
                  title="Project Description"
                />
              </div>

              {isLastStep ? (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    submitting
                      ? 'bg-white text-foreground-subtle cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {submitting ? t('common.submitting') : t('assessment.submitAssessment')}
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  disabled={!hasSelection}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    !hasSelection
                      ? 'bg-white text-foreground-subtle cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {t('common.next')}
                </button>
              )}
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
                  <span className="font-medium text-foreground">{t('assessment.allStepsCompleted')}</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* AI评估结果 */}
        {showResult && (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">{t('assessment.resultTitle')}</h1>
              <p className="text-foreground-muted">
                {isStreaming ? t('assessment.generating') : t('assessment.resultSubtitle')}
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">AI Assessment Result</h2>
              </div>
            
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6 border-l-2 border-primary">
                  <div className="text-foreground leading-relaxed">
                    {assessmentResult ? (
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 mt-6 text-foreground" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 mt-5 text-foreground" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2 mt-4 text-foreground" {...props} />,
                          p: ({node, ...props}) => <p className="mb-3 text-foreground-muted" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1 text-foreground-muted" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1 text-foreground-muted" {...props} />,
                          li: ({node, ...props}) => <li className="ml-4" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-foreground" {...props} />,
                          code: ({node, ...props}) => <code className="bg-background px-2 py-0.5 rounded text-sm text-primary border border-border" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-primary pl-4 italic my-3 text-foreground-muted" {...props} />,
                        }}
                      >
                        {assessmentResult}
                      </ReactMarkdown>
                    ) : (
                      <div className="flex items-center gap-3 text-foreground-muted">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('assessment.waiting')}</span>
                      </div>
                    )}
                    {isStreaming && (
                      <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse"></span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="glass-card rounded-xl p-6">
                  <p className="text-center text-foreground mb-6 font-medium">
                    {t('assessment.moreAssessment')}
                  </p>
                  <div className="text-center">
                    <a
                      href={import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/your_telegram_username'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="px-8 py-4 btn-primary rounded-xl font-semibold flex items-center justify-center gap-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        {t('assessment.contactProfessional')}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default AssessmentForm

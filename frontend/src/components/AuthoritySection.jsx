import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

// 合作项目 - 幻灯片形式
function ProjectsCarousel() {
  const { t } = useLanguage()
  const projects = t('authority.projectsList')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [projects.length])

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 h-full">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </span>
        {t('authority.projects')}
      </h3>
      <div className="relative h-56 overflow-hidden rounded-xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ${
              index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="bg-background-tertiary rounded-xl p-6 h-full flex flex-col justify-center border border-border">
              <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2">{project.type}</div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{project.name}</h4>
              <p className="text-foreground-muted text-sm leading-relaxed">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-border-hover hover:bg-foreground-subtle'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// 处理资金 - 围绕中心展示
function FundsDisplay() {
  const { t } = useLanguage()
  const fundsList = t('authority.fundsList')

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        {t('authority.funds')}
      </h3>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <p className="text-5xl md:text-6xl font-bold gradient-text mb-2">{t('authority.totalFunds')}</p>
          <p className="text-foreground-subtle text-sm">{t('authority.fundsDesc') || 'Total Value Managed'}</p>
        </div>
        
        <div className="space-y-3">
          {fundsList.map((fund, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-background-tertiary border border-border hover:border-border-hover transition-colors"
            >
              <span className="text-foreground-muted text-sm">{fund.label}</span>
              <span className="font-semibold text-foreground">{fund.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 成功案例 - 卡片网格
function SuccessCases() {
  const { t } = useLanguage()
  const cases = [
    {
      title: t('authority.case1.title'),
      desc: t('authority.case1.desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: t('authority.case2.title'),
      desc: t('authority.case2.desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t('authority.case3.title'),
      desc: t('authority.case3.desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: t('authority.case4.title'),
      desc: t('authority.case4.desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    }
  ]

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 h-full">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </span>
        {t('authority.successCases')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((caseItem, index) => (
          <div
            key={index}
            className="group p-5 rounded-xl bg-background-tertiary border border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-muted flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
              {caseItem.icon}
            </div>
            <h4 className="font-semibold text-foreground mb-2">{caseItem.title}</h4>
            <p className="text-sm text-foreground-muted leading-relaxed">{caseItem.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// 背景团队 - 围绕中心展示（移动端改为垂直布局）
function TeamDisplay() {
  const { t } = useLanguage()
  const team = t('authority.teamList')

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 h-full">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
        {t('authority.team')}
      </h3>
      
      <div className="space-y-4">
        {team.map((member, index) => (
          <div
            key={index}
            className="p-5 rounded-xl bg-background-tertiary border border-border hover:border-border-hover transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 border border-border">
                <span className="text-lg font-semibold gradient-text">{member.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">{member.name}</h4>
                <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                <p className="text-xs text-foreground-muted">{member.experience}</p>
                {member.skills && <p className="text-xs text-foreground-subtle mt-1">{member.skills}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 专注时间 - 时间线展示
function ExperienceTimeline() {
  const { t } = useLanguage()
  const experiences = t('authority.experienceTimeline')
  const skills = t('authority.skillsList')

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              {t('authority.experienceTitle') || 'Experience'}
            </h3>
            <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{t('authority.experience')}</p>
            <p className="text-foreground-muted">{t('authority.experienceDesc')}</p>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-medium text-foreground mb-4">{t('authority.skills')}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-background-tertiary border border-border rounded-full text-xs text-foreground-muted hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-2/3">
          <div className="relative pl-8">
            {/* 时间线 */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
                  <div className="p-5 rounded-xl bg-background-tertiary border border-border hover:border-border-hover transition-colors">
                    <div className="text-xs font-medium text-primary mb-2">{exp.year}</div>
                    <h4 className="font-semibold text-foreground mb-2">{exp.title}</h4>
                    <p className="text-sm text-foreground-muted leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthoritySection() {
  const { t } = useLanguage()
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">{t('authority.title')}</h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">{t('authority.subtitle') || 'Building trust through proven expertise and results'}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 合作项目 - 幻灯片 */}
          <ProjectsCarousel />
          
          {/* 处理资金 - 围绕中心 */}
          <FundsDisplay />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 成功案例 - 卡片网格 */}
          <SuccessCases />
          
          {/* 背景团队 - 围绕中心 */}
          <TeamDisplay />
        </div>
        
        {/* 专注时间 - 时间线 */}
        <ExperienceTimeline />
      </div>
    </section>
  )
}

export default AuthoritySection

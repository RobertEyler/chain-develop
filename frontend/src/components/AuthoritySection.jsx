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
    }, 3000)
    return () => clearInterval(timer)
  }, [projects.length])

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{t('authority.projects')}</h3>
      <div className="relative h-64 overflow-hidden rounded-lg">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="bg-white rounded-lg p-6 shadow-lg h-full flex flex-col justify-center">
              <div className="text-sm text-indigo-600 font-semibold mb-2">{project.type}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h4>
              <p className="text-gray-600">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300'
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
  const funds = fundsList.map((fund, index) => ({
    ...fund,
    color: [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500'
    ][index]
  }))

  return (
    <div className="relative bg-white rounded-xl p-8 h-full flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <p className="text-5xl md:text-6xl font-bold text-indigo-600 mb-2">{t('authority.totalFunds')}</p>
            <p className="text-gray-600 text-lg">{t('authority.funds')}</p>
          </div>
        </div>
        
        <div className="space-y-4 mt-8">
          {funds.map((fund, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${fund.color} text-white rounded-lg p-4 shadow-md transform hover:scale-105 transition-transform`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{fund.label}</span>
                <span className="font-bold text-lg">{fund.amount}</span>
              </div>
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
      icon: '📈',
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: t('authority.case2.title'),
      desc: t('authority.case2.desc'),
      icon: '🔒',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: t('authority.case3.title'),
      desc: t('authority.case3.desc'),
      icon: '🎨',
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: t('authority.case4.title'),
      desc: t('authority.case4.desc'),
      icon: '🌉',
      color: 'from-orange-400 to-red-500'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{t('authority.successCases')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((caseItem, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${caseItem.color} text-white rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform`}
          >
            <div className="text-3xl mb-2">{caseItem.icon}</div>
            <h4 className="font-bold text-lg mb-2">{caseItem.title}</h4>
            <p className="text-sm text-white/90">{caseItem.desc}</p>
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
    <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 md:p-8 h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-6 md:mb-8 text-center">{t('authority.team')}</h3>
      
      {/* 移动端：垂直布局 */}
      <div className="md:hidden space-y-4">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform"
          >
            <h4 className="font-bold text-gray-900 mb-1">{member.name}</h4>
            <p className="text-sm text-indigo-600 font-semibold mb-1">{member.role}</p>
            <p className="text-xs text-gray-600 mb-2">{member.experience}</p>
            {member.skills && <p className="text-xs text-gray-700">{member.skills}</p>}
          </div>
        ))}
      </div>
      
      {/* 桌面端：围绕中心布局 */}
      <div className="hidden md:block relative w-full h-80">
        {/* 中心 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
            <span className="text-4xl">👥</span>
          </div>
        </div>
        
        {/* 团队成员围绕中心 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg w-48 transform hover:scale-110 transition-transform z-20">
          <h4 className="font-bold text-gray-900 mb-1">{team[0].name}</h4>
          <p className="text-sm text-indigo-600 font-semibold mb-1">{team[0].role}</p>
          <p className="text-xs text-gray-600 mb-2">{team[0].experience}</p>
          {team[0].skills && <p className="text-xs text-gray-700">{team[0].skills}</p>}
        </div>
        
        <div className="absolute bottom-8 left-4 translate-x-0 translate-y-0 bg-white rounded-lg p-4 shadow-lg w-48 transform hover:scale-110 transition-transform z-20">
          <h4 className="font-bold text-gray-900 mb-1">{team[1].name}</h4>
          <p className="text-sm text-indigo-600 font-semibold mb-1">{team[1].role}</p>
          <p className="text-xs text-gray-600 mb-2">{team[1].experience}</p>
          {team[1].skills && <p className="text-xs text-gray-700">{team[1].skills}</p>}
        </div>
        
        <div className="absolute bottom-8 right-4 translate-x-0 translate-y-0 bg-white rounded-lg p-4 shadow-lg w-48 transform hover:scale-110 transition-transform z-20">
          <h4 className="font-bold text-gray-900 mb-1">{team[2].name}</h4>
          <p className="text-sm text-indigo-600 font-semibold mb-1">{team[2].role}</p>
          <p className="text-xs text-gray-600 mb-2">{team[2].experience}</p>
          {team[2].skills && <p className="text-xs text-gray-700">{team[2].skills}</p>}
        </div>
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
    <div className="bg-white rounded-xl p-6 h-full">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-indigo-600 mb-2">{t('authority.experience')}</p>
        <p className="text-gray-600">{t('authority.experienceDesc')}</p>
      </div>
      
      <div className="relative">
        {/* 时间线 */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12">
              <div className="absolute left-2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-semibold text-indigo-600 mb-1">{exp.year}</div>
                <h4 className="font-bold text-gray-900 mb-1">{exp.title}</h4>
                <p className="text-sm text-gray-600">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">{t('authority.skills')}</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function AuthoritySection() {
  const { t } = useLanguage()
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">{t('authority.title')}</h2>
        
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
        <div className="max-w-4xl mx-auto">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  )
}

export default AuthoritySection

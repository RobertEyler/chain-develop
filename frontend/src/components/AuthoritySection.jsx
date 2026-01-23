import { useState, useEffect } from 'react'

// 合作项目 - 幻灯片形式
function ProjectsCarousel() {
  const projects = [
    { name: 'DeFi 借贷平台', desc: '智能合约开发与审计', type: 'DeFi' },
    { name: 'NFT 交易市场', desc: '全栈开发与优化', type: 'NFT' },
    { name: '跨链桥接协议', desc: '安全架构设计', type: 'Infrastructure' },
    { name: 'DAO 治理平台', desc: '去中心化系统开发', type: 'DAO' },
    { name: 'Web3 钱包应用', desc: '安全与用户体验优化', type: 'Wallet' }
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [projects.length])

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">🤝 合作项目</h3>
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
  const funds = [
    { label: '智能合约管理', amount: '$1.8 亿', color: 'from-blue-500 to-cyan-500' },
    { label: '代币发行与流动性', amount: '$5000 万+', color: 'from-purple-500 to-pink-500' },
    { label: '跨链资产转移', amount: '$2000 万+', color: 'from-green-500 to-emerald-500' }
  ]

  return (
    <div className="relative bg-white rounded-xl p-8 h-full flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <p className="text-5xl md:text-6xl font-bold text-indigo-600 mb-2">$2.5 亿+</p>
            <p className="text-gray-600 text-lg">累积处理资金</p>
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
  const cases = [
    {
      title: 'DeFi 协议优化',
      desc: '帮助某 DeFi 项目优化 Gas 费用，降低 40% 交易成本，用户增长 300%',
      icon: '📈',
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: '安全审计与修复',
      desc: '发现并修复 15+ 高危漏洞，保护超过 $5000 万资产安全',
      icon: '🔒',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'NFT 平台开发',
      desc: '从零到一构建 NFT 交易平台，上线 3 个月交易量突破 $1000 万',
      icon: '🎨',
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: '跨链解决方案',
      desc: '设计并实现跨链桥接，支持 5+ 主流公链，处理交易 10 万+ 笔',
      icon: '🌉',
      color: 'from-orange-400 to-red-500'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">✅ 成功案例</h3>
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
  const team = [
    {
      name: '张工程师',
      role: '区块链开发',
      experience: '8 年经验',
      skills: 'Solidity、DeFi 协议、安全审计'
    },
    {
      name: '李架构师',
      role: '区块链架构',
      experience: '10 年经验',
      skills: '系统架构、跨链技术、共识算法'
    },
    {
      name: '王安全专家',
      role: '区块链安全',
      experience: '7 年经验',
      skills: '安全审计、漏洞挖掘、安全防护'
    }
  ]

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 md:p-8 h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-6 md:mb-8 text-center">👥 背景团队</h3>
      
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
            <p className="text-xs text-gray-700">{member.skills}</p>
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
          <p className="text-xs text-gray-700">{team[0].skills}</p>
        </div>
        
        <div className="absolute bottom-0 left-0 translate-x-1/2 translate-y-1/2 bg-white rounded-lg p-4 shadow-lg w-48 transform hover:scale-110 transition-transform z-20">
          <h4 className="font-bold text-gray-900 mb-1">{team[1].name}</h4>
          <p className="text-sm text-indigo-600 font-semibold mb-1">{team[1].role}</p>
          <p className="text-xs text-gray-600 mb-2">{team[1].experience}</p>
          <p className="text-xs text-gray-700">{team[1].skills}</p>
        </div>
        
        <div className="absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/2 bg-white rounded-lg p-4 shadow-lg w-48 transform hover:scale-110 transition-transform z-20">
          <h4 className="font-bold text-gray-900 mb-1">{team[2].name}</h4>
          <p className="text-sm text-indigo-600 font-semibold mb-1">{team[2].role}</p>
          <p className="text-xs text-gray-600 mb-2">{team[2].experience}</p>
          <p className="text-xs text-gray-700">{team[2].skills}</p>
        </div>
      </div>
    </div>
  )
}

// 专注时间 - 时间线展示
function ExperienceTimeline() {
  const experiences = [
    { year: '2014-2016', title: '起步阶段', desc: '专注智能合约开发基础' },
    { year: '2017-2019', title: '快速发展', desc: 'DeFi 协议设计与实现' },
    { year: '2020-2022', title: '技术突破', desc: '跨链技术与 Layer 2 解决方案' },
    { year: '2023-至今', title: '行业领先', desc: '服务 50+ Web3 项目，覆盖多链生态' }
  ]

  const skills = [
    '智能合约开发与优化（Solidity, Rust）',
    'DeFi 协议设计与实现',
    'NFT 标准与市场开发',
    '跨链桥接与互操作性',
    'Layer 2 扩容解决方案'
  ]

  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-indigo-600 mb-2">⏰ 10+ 年</p>
        <p className="text-gray-600">专注区块链开发</p>
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
        <h4 className="font-semibold text-gray-900 mb-3">技术专长</h4>
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
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">为什么选择我们</h2>
        
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

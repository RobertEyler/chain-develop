// 多语言翻译配置
export const translations = {
  en: {
    // 通用
    common: {
      backToHome: 'Back to Home',
      next: 'Next',
      prev: 'Previous',
      submit: 'Submit',
      submitting: 'Submitting...',
      loading: 'Loading...',
      contact: 'Contact',
      custom: 'Custom',
      start: 'Start',
      getStarted: 'Get Started',
      allRightsReserved: 'All rights reserved.',
    },
    // 导航
    nav: {
      limitedService: 'Limited Service',
      whyChooseUs: 'Why Choose Us',
      beforeStart: 'Before You Start',
      whatWeCanDo: 'What We Can Do',
      startNow: 'Start Now',
      blog: 'Blog',
    },
    // 首页
    home: {
      title: 'Enterprise Blockchain & Web3 Development Services | BuildWeb3',
      description: 'Professional enterprise blockchain development services and web3 development services. Support up to 5 Web3 projects per month with technical assessment and consulting. Get assessment in 2 minutes.',
      keywords: 'enterprise blockchain development services, web3 development services, blockchain smart contract development services, solana blockchain development services, blockchain development services',
      brand: 'BuildWeb3',
    },
    // 限量服务
    scarcity: {
      title: 'Limited Service, Focus on Quality',
      description: 'We support a maximum of 5 Web3 projects per month to ensure sufficient investment in each project.',
      countdown: 'Application Deadline Countdown',
      deadline: 'Deadline:',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    // 为什么选择我们
    authority: {
      title: 'Why Choose Us',
      projects: '🤝 Partner Projects',
      funds: 'Cumulative Funds Processed',
      totalFunds: '$250M+',
      successCases: '✅ Success Cases',
      team: 'Background Team',
      experience: '⏰ 10+ Years',
      experienceDesc: 'Focused on Blockchain Development',
      skills: 'Technical Expertise',
      // 资金列表
      fundsList: [
        { label: 'Smart Contract Management', amount: '$180M' },
        { label: 'Token Issuance & Liquidity', amount: '$50M+' },
        { label: 'Cross-Chain Asset Transfer', amount: '$20M+' },
      ],
      // 合作项目
      projectsList: [
        { name: 'DeFi Lending Platform', desc: 'Smart Contract Development & Audit', type: 'DeFi' },
        { name: 'NFT Trading Market', desc: 'Full-Stack Development & Optimization', type: 'NFT' },
        { name: 'Cross-Chain Bridge Protocol', desc: 'Security Architecture Design', type: 'Infrastructure' },
        { name: 'DAO Governance Platform', desc: 'Decentralized System Development', type: 'DAO' },
        { name: 'Web3 Wallet Application', desc: 'Security & UX Optimization', type: 'Wallet' },
      ],
      // 案例
      case1: {
        title: 'DeFi Protocol Optimization',
        desc: 'Helped a DeFi project optimize Gas fees, reducing transaction costs by 40%, user growth by 300%',
      },
      case2: {
        title: 'Security Audit & Fixes',
        desc: 'Discovered and fixed 15+ critical vulnerabilities, protecting over $50M in assets',
      },
      case3: {
        title: 'NFT Platform Development',
        desc: 'Built NFT trading platform from scratch, transaction volume exceeded $10M in 3 months',
      },
      case4: {
        title: 'Cross-Chain Solution',
        desc: 'Designed and implemented cross-chain bridge, supporting 5+ major chains, processed 100K+ transactions',
      },
      // 团队成员
      teamList: [
        {
          name: 'Daniel Smith',
          role: 'Blockchain Development',
          experience: '8 Years Experience',
          skills: 'Solidity, DeFi Protocols, Security Audits',
        },
        {
          name: 'Eric Johnson',
          role: 'Blockchain Architecture',
          experience: '10 Years Experience',
          skills: 'System Architecture, Cross-Chain Technology, Consensus Algorithms',
        },
        {
          name: 'Kevin Brown',
          role: 'Blockchain Security',
          experience: '7 Years Experience',
          skills: 'Security Audits, Vulnerability Mining, Security Protection',
        },
      ],
      // 经验时间线
      experienceTimeline: [
        { year: '2014-2016', title: 'Starting Phase', desc: 'Focused on Smart Contract Development Fundamentals' },
        { year: '2017-2019', title: 'Rapid Development', desc: 'DeFi Protocol Design & Implementation' },
        { year: '2020-2022', title: 'Technical Breakthrough', desc: 'Cross-Chain Technology & Layer 2 Solutions' },
        { year: '2023-Present', title: 'Industry Leader', desc: 'Served 50+ Web3 Projects, Covering Multi-Chain Ecosystem' },
      ],
      // 技能列表
      skillsList: [
        'Smart Contract Development & Optimization (Solidity, Rust)',
        'DeFi Protocol Design & Implementation',
        'NFT Standards & Market Development',
        'Cross-Chain Bridging & Interoperability',
        'Layer 2 Scaling Solutions',
      ],
    },
    // 开始之前
    commitment: {
      title: 'Before You Start, Please Confirm',
      step: 'Step',
      completed: 'Completed',
      of: 'of',
      transparency: {
        title: 'About Transparency',
        options: [
          'I understand the project needs transparent communication',
          'I am willing to share the real situation of the project',
          'I agree that transparency helps project success',
          'I am ready for open dialogue',
        ],
      },
      role: {
        title: 'Project Role',
        options: [
          'I am the founder/co-founder of the project',
          'I am a core decision maker of the project',
          'I have the main decision-making power of the project',
          'I can make decisions on behalf of the project',
        ],
      },
      goal: {
        title: 'Project Goals',
        options: [
          'I hope to get professional guidance',
          'I want to avoid common technical pitfalls',
          'I hope to save development time',
          'I value the value of professional advice',
        ],
      },
      preparation: {
        title: 'Preparation',
        options: [
          'I have prepared the basic project information',
          'I can provide project technical requirements',
          'I understand the project budget range',
          'I am ready to start the assessment',
        ],
      },
      action: {
        title: 'Next Steps',
        options: [
          'I am ready to proceed',
          'I understand the assessment process',
          'I am willing to invest time to cooperate',
          'I look forward to getting the assessment results',
        ],
      },
      getFreeAssessment: 'Get Free Professional Technical Assessment',
      allStepsCompleted: 'All steps completed!',
    },
    // 我们能做什么
    reciprocity: {
      title: 'What We Can Do For You',
      description: 'We will tell you directly:',
      benefits: [
        'Is your idea worth doing',
        'Which features are not worth spending money on',
        'Where are the easiest pitfalls',
      ],
      getFreeAssessment: 'Get Free Professional Technical Assessment',
    },
    // 立即开始
    easyAccess: {
      title: 'Start Now',
      getImmediately: {
        title: 'Get Immediately',
        desc: 'Quickly start your project assessment',
        button: 'Start Application',
      },
      contactUs: {
        title: 'Contact Us',
        desc: 'Quickly understand project feasibility',
        button: 'Contact Us',
      },
      custom: {
        title: 'Custom Solution',
        desc: 'Learn about assessment report format',
        button: 'Custom Solution',
      },
    },
    // 评估表单
    assessment: {
      title: 'Professional Technical Assessment',
      subtitle: 'Please answer the following questions to help us better understand your project needs',
      resultTitle: 'Assessment Result',
      resultSubtitle: 'Based on the information you provided, AI has generated a professional assessment for you',
      generating: 'AI is generating assessment...',
      waiting: 'Waiting for AI to generate assessment...',
      step: 'Step',
      completed: 'Completed',
      of: 'of',
      projectDescription: 'Project Description',
      projectDescriptionPlaceholder: 'For example: We are developing an Ethereum-based DeFi lending platform, mainly targeting SMEs and individual users, providing decentralized lending services...',
      projectDescriptionHint: 'Please briefly describe your project, including project goals, core functions, target users, etc. (Optional, but recommended for more accurate assessment)',
      characters: 'characters',
      submitAssessment: 'Submit Assessment',
      moreAssessment: 'Need more assessments?',
      contactProfessional: 'Contact Professional Customer Service',
      allStepsCompleted: 'All information has been filled in! Please click "Submit Assessment" to complete the application.',
      // 问题
      questions: {
        chain: {
          title: 'What chain is your project on?',
          options: [
            'Ethereum',
            'Polygon',
            'BSC (Binance Smart Chain)',
            'Arbitrum',
            'Optimism',
            'Avalanche',
            'Solana',
            'Other',
          ],
        },
        projectType: {
          title: 'What type is your project?',
          options: [
            'DeFi (Decentralized Finance)',
            'NFT (Non-Fungible Token)',
            'GameFi (Gaming Finance)',
            'DAO (Decentralized Autonomous Organization)',
            'Web3 Infrastructure',
            'Cross-Chain Bridge',
            'Layer 2 Solution',
            'Other',
          ],
        },
        revenueSource: {
          title: 'Where does project revenue come from?',
          options: [
            'Trading Fees',
            'Token Issuance & Sales',
            'Liquidity Mining Rewards',
            'NFT Trading Commission',
            'Subscription or Membership Fees',
            'Advertising Revenue',
            'Other',
          ],
        },
        projectStage: {
          title: 'What stage is your project at now?',
          options: [
            'Concept Stage (Only Ideas)',
            'Development Stage (In Development)',
            'Testing Stage (Testnet Running)',
            'Mainnet Launch (Launched)',
            'Operation Stage (Has Users)',
          ],
        },
        coreGoal: {
          title: 'Understand Core Goals/Needs',
          options: [
            'Fundraising (Seeking Investment)',
            'Technical Implementation (Implementing Technical Solutions)',
            'Community Growth (Expanding User Base)',
            'Product Optimization (Improving Existing Products)',
            'Security Audit (Ensuring Project Security)',
            'Market Promotion (Enhancing Brand Awareness)',
          ],
        },
        riskPreference: {
          title: 'Risk Preference',
          options: [
            'Conservative (Prioritize Security, Willing to Sacrifice Some Innovation)',
            'Balanced (Balance Between Security and Innovation)',
            'Aggressive (Pursue Innovation, Willing to Take Higher Risks)',
          ],
        },
      },
    },
    // 错误信息
    errors: {
      rateLimit: 'Daily assessment limit reached',
      rateLimitTip: 'Please try again tomorrow',
      submitFailed: 'Submission failed',
    },
  },
  'zh-CN': {
    // 通用
    common: {
      backToHome: '返回首页',
      next: '下一步',
      prev: '上一步',
      submit: '提交',
      submitting: '提交中...',
      loading: '加载中...',
      contact: '联系',
      custom: '定制',
      start: '开始',
      getStarted: '立即开始',
      allRightsReserved: '保留所有权利.',
    },
    // 导航
    nav: {
      limitedService: '限量服务',
      whyChooseUs: '为什么选择我们',
      beforeStart: '开始之前',
      whatWeCanDo: '我们能做什么',
      startNow: '立即开始',
      blog: '博客',
    },
    // 首页
    home: {
      title: '企业区块链开发服务 | Web3开发服务 | BuildWeb3',
      description: '专业的企业区块链开发服务和Web3开发服务。每月最多支持5个Web3项目，提供技术评估和咨询服务。2分钟获取评估。',
      keywords: '企业区块链开发服务,web3开发服务,区块链智能合约开发服务,Solana区块链开发服务,区块链开发服务',
      brand: 'BuildWeb3',
    },
    // 限量服务
    scarcity: {
      title: '限量服务，专注品质',
      description: '我们每月最多支持 5 个 Web3 项目，以保证每个项目都有足够投入。',
      countdown: '本期申请截止倒计时',
      deadline: '截止日期：',
      days: '天',
      hours: '时',
      minutes: '分',
      seconds: '秒',
    },
    // 为什么选择我们
    authority: {
      title: '为什么选择我们',
      projects: '🤝 合作项目',
      funds: '累积处理资金',
      totalFunds: '$2.5 亿+',
      successCases: '✅ 成功案例',
      team: '👥 背景团队',
      experience: '⏰ 10+ 年',
      experienceDesc: '专注区块链开发',
      skills: '技术专长',
      // 资金列表
      fundsList: [
        { label: '智能合约管理', amount: '$1.8 亿' },
        { label: '代币发行与流动性', amount: '$5000 万+' },
        { label: '跨链资产转移', amount: '$2000 万+' },
      ],
      // 合作项目
      projectsList: [
        { name: 'DeFi 借贷平台', desc: '智能合约开发与审计', type: 'DeFi' },
        { name: 'NFT 交易市场', desc: '全栈开发与优化', type: 'NFT' },
        { name: '跨链桥接协议', desc: '安全架构设计', type: 'Infrastructure' },
        { name: 'DAO 治理平台', desc: '去中心化系统开发', type: 'DAO' },
        { name: 'Web3 钱包应用', desc: '安全与用户体验优化', type: 'Wallet' },
      ],
      // 案例
      case1: {
        title: 'DeFi 协议优化',
        desc: '帮助某 DeFi 项目优化 Gas 费用，降低 40% 交易成本，用户增长 300%',
      },
      case2: {
        title: '安全审计与修复',
        desc: '发现并修复 15+ 高危漏洞，保护超过 $5000 万资产安全',
      },
      case3: {
        title: 'NFT 平台开发',
        desc: '从零到一构建 NFT 交易平台，上线 3 个月交易量突破 $1000 万',
      },
      case4: {
        title: '跨链解决方案',
        desc: '设计并实现跨链桥接，支持 5+ 主流公链，处理交易 10 万+ 笔',
      },
      // 团队成员
      teamList: [
        {
          name: 'Daniel Smith',
          role: '区块链开发',
          experience: '8 年经验',
          skills: 'Solidity、DeFi 协议、安全审计',
        },
        {
          name: 'Eric Johnson',
          role: '区块链架构',
          experience: '10 年经验',
          skills: '系统架构、跨链技术、共识算法',
        },
        {
          name: 'Kevin Brown',
          role: '区块链安全',
          experience: '7 年经验',
          skills: '安全审计、漏洞挖掘、安全防护',
        },
      ],
      // 经验时间线
      experienceTimeline: [
        { year: '2014-2016', title: '起步阶段', desc: '专注智能合约开发基础' },
        { year: '2017-2019', title: '快速发展', desc: 'DeFi 协议设计与实现' },
        { year: '2020-2022', title: '技术突破', desc: '跨链技术与 Layer 2 解决方案' },
        { year: '2023-至今', title: '行业领先', desc: '服务 50+ Web3 项目，覆盖多链生态' },
      ],
      // 技能列表
      skillsList: [
        '智能合约开发与优化（Solidity, Rust）',
        'DeFi 协议设计与实现',
        'NFT 标准与市场开发',
        '跨链桥接与互操作性',
        'Layer 2 扩容解决方案',
      ],
    },
    // 开始之前
    commitment: {
      title: '开始之前，请确认',
      step: '步骤',
      completed: '已完成',
      of: '/',
      transparency: {
        title: '关于透明度',
        options: [
          '我理解项目需要透明沟通',
          '我愿意分享项目真实情况',
          '我认同透明度有助于项目成功',
          '我准备好进行开放对话',
        ],
      },
      role: {
        title: '项目角色',
        options: [
          '我是项目的创始人/联合创始人',
          '我是项目的核心决策者',
          '我有项目的主要决策权',
          '我可以代表项目做决定',
        ],
      },
      goal: {
        title: '项目目标',
        options: [
          '我希望获得专业指导',
          '我想避免常见的技术陷阱',
          '我希望能节省开发时间',
          '我重视专业建议的价值',
        ],
      },
      preparation: {
        title: '准备情况',
        options: [
          '我已经准备好项目基本信息',
          '我可以提供项目技术需求',
          '我了解项目的预算范围',
          '我已经准备好开始评估',
        ],
      },
      action: {
        title: '下一步行动',
        options: [
          '我准备好进入下一步',
          '我理解评估流程',
          '我愿意投入时间配合',
          '我期待获得评估结果',
        ],
      },
      getFreeAssessment: '免费获得专业的技术评估',
      allStepsCompleted: '所有步骤已完成！',
    },
    // 我们能做什么
    reciprocity: {
      title: '我们能为您做什么',
      description: '我们会直接告诉你：',
      benefits: [
        '你的想法是否值得做',
        '哪些功能不值得花钱',
        '哪些地方最容易踩坑',
      ],
      getFreeAssessment: '免费获得专业的技术评估',
    },
    // 立即开始
    easyAccess: {
      title: '立即开始',
      getImmediately: {
        title: '立即获取',
        desc: '快速开始您的项目评估',
        button: '开始申请',
      },
      contactUs: {
        title: '联系我们',
        desc: '快速了解项目可行性',
        button: '联系我们',
      },
      custom: {
        title: '定制方案',
        desc: '了解评估报告格式',
        button: '定制方案',
      },
    },
    // 评估表单
    assessment: {
      title: '专业的技术评估',
      subtitle: '请回答以下问题，帮助我们更好地了解您的项目需求',
      resultTitle: '评估结果',
      resultSubtitle: '基于您提供的信息，AI已为您生成专业评估',
      generating: 'AI 正在生成评估...',
      waiting: '等待 AI 生成评估...',
      step: '步骤',
      completed: '已完成',
      of: '/',
      projectDescription: '项目简介',
      projectDescriptionPlaceholder: '例如：我们正在开发一个基于以太坊的 DeFi 借贷平台，主要面向中小企业和个人用户，提供去中心化的借贷服务...',
      projectDescriptionHint: '请简要描述您的项目，包括项目目标、核心功能、目标用户等信息（可选，但建议填写以获得更准确的评估）',
      characters: '字符',
      submitAssessment: '提交评估',
      moreAssessment: '需要更多评估？',
      contactProfessional: '联系专业客服',
      allStepsCompleted: '所有信息已填写完成！请点击"提交评估"完成申请。',
      // 问题
      questions: {
        chain: {
          title: '你的项目是什么链',
          options: [
            'Ethereum',
            'Polygon',
            'BSC (Binance Smart Chain)',
            'Arbitrum',
            'Optimism',
            'Avalanche',
            'Solana',
            '其他',
          ],
        },
        projectType: {
          title: '你的项目什么类型',
          options: [
            'DeFi (去中心化金融)',
            'NFT (非同质化代币)',
            'GameFi (游戏化金融)',
            'DAO (去中心化自治组织)',
            'Web3 基础设施',
            '跨链桥接',
            'Layer 2 解决方案',
            '其他',
          ],
        },
        revenueSource: {
          title: '项目收益来自哪里',
          options: [
            '交易手续费',
            '代币发行与销售',
            '流动性挖矿奖励',
            'NFT 交易佣金',
            '订阅或会员费用',
            '广告收入',
            '其他',
          ],
        },
        projectStage: {
          title: '你的项目现在处于哪个阶段',
          options: [
            '概念阶段（只有想法）',
            '开发阶段（正在开发中）',
            '测试阶段（测试网运行）',
            '主网上线（已上线）',
            '运营阶段（已有用户）',
          ],
        },
        coreGoal: {
          title: '了解核心目标/需求',
          options: [
            '融资（寻求投资）',
            '技术落地（实现技术方案）',
            '社区增长（扩大用户基础）',
            '产品优化（改进现有产品）',
            '安全审计（确保项目安全）',
            '市场推广（提升品牌知名度）',
          ],
        },
        riskPreference: {
          title: '风险偏好',
          options: [
            '保守型（优先安全性，愿意牺牲一些创新）',
            '平衡型（在安全性和创新之间平衡）',
            '激进型（追求创新，愿意承担更高风险）',
          ],
        },
      },
    },
    // 错误信息
    errors: {
      rateLimit: '今日评估次数已用完',
      rateLimitTip: '请明天再试',
      submitFailed: '提交失败',
    },
  },
  'zh-TW': {
    // 通用
    common: {
      backToHome: '返回首頁',
      next: '下一步',
      prev: '上一步',
      submit: '提交',
      submitting: '提交中...',
      loading: '載入中...',
      contact: '聯繫',
      custom: '定制',
      start: '開始',
      getStarted: '立即開始',
      allRightsReserved: '保留所有權利.',
    },
    // 导航
    nav: {
      limitedService: '限量服務',
      whyChooseUs: '為什麼選擇我們',
      beforeStart: '開始之前',
      whatWeCanDo: '我們能做什麼',
      startNow: '立即開始',
      blog: '博客',
    },
    // 首页
    home: {
      title: '企業區塊鏈開發服務 | Web3開發服務 | BuildWeb3',
      description: '專業的企業區塊鏈開發服務和Web3開發服務。每月最多支持5個Web3項目，提供技術評估和諮詢服務。2分鐘獲取評估。',
      keywords: '企業區塊鏈開發服務,web3開發服務,區塊鏈智能合約開發服務,Solana區塊鏈開發服務,區塊鏈開發服務',
      brand: 'BuildWeb3',
    },
    // 限量服务
    scarcity: {
      title: '限量服務，專注品質',
      description: '我們每月最多支持 5 個 Web3 項目，以保證每個項目都有足夠投入。',
      countdown: '本期申請截止倒計時',
      deadline: '截止日期：',
      days: '天',
      hours: '時',
      minutes: '分',
      seconds: '秒',
    },
    // 为什么选择我们
    authority: {
      title: '為什麼選擇我們',
      projects: '🤝 合作項目',
      funds: '累積處理資金',
      totalFunds: '$2.5 億+',
      successCases: '✅ 成功案例',
      team: '👥 背景團隊',
      experience: '⏰ 10+ 年',
      experienceDesc: '專注區塊鏈開發',
      skills: '技術專長',
      // 资金列表
      fundsList: [
        { label: '智能合約管理', amount: '$1.8 億' },
        { label: '代幣發行與流動性', amount: '$5000 萬+' },
        { label: '跨鏈資產轉移', amount: '$2000 萬+' },
      ],
      // 合作项目
      projectsList: [
        { name: 'DeFi 借貸平台', desc: '智能合約開發與審計', type: 'DeFi' },
        { name: 'NFT 交易市場', desc: '全棧開發與優化', type: 'NFT' },
        { name: '跨鏈橋接協議', desc: '安全架構設計', type: 'Infrastructure' },
        { name: 'DAO 治理平台', desc: '去中心化系統開發', type: 'DAO' },
        { name: 'Web3 錢包應用', desc: '安全與用戶體驗優化', type: 'Wallet' },
      ],
      // 案例
      case1: {
        title: 'DeFi 協議優化',
        desc: '幫助某 DeFi 項目優化 Gas 費用，降低 40% 交易成本，用戶增長 300%',
      },
      case2: {
        title: '安全審計與修復',
        desc: '發現並修復 15+ 高危漏洞，保護超過 $5000 萬資產安全',
      },
      case3: {
        title: 'NFT 平台開發',
        desc: '從零到一構建 NFT 交易平台，上線 3 個月交易量突破 $1000 萬',
      },
      case4: {
        title: '跨鏈解決方案',
        desc: '設計並實現跨鏈橋接，支持 5+ 主流公鏈，處理交易 10 萬+ 筆',
      },
      // 团队成员
      teamList: [
        {
          name: 'Daniel Smith',
          role: '區塊鏈開發',
          experience: '8 年經驗',
          skills: 'Solidity、DeFi 協議、安全審計',
        },
        {
          name: 'Eric Johnson',
          role: '區塊鏈架構',
          experience: '10 年經驗',
          skills: '系統架構、跨鏈技術、共識算法',
        },
        {
          name: 'Kevin Brown',
          role: '區塊鏈安全',
          experience: '7 年經驗',
          skills: '安全審計、漏洞挖掘、安全防護',
        },
      ],
      // 经验时间线
      experienceTimeline: [
        { year: '2014-2016', title: '起步階段', desc: '專注智能合約開發基礎' },
        { year: '2017-2019', title: '快速發展', desc: 'DeFi 協議設計與實現' },
        { year: '2020-2022', title: '技術突破', desc: '跨鏈技術與 Layer 2 解決方案' },
        { year: '2023-至今', title: '行業領先', desc: '服務 50+ Web3 項目，覆蓋多鏈生態' },
      ],
      // 技能列表
      skillsList: [
        '智能合約開發與優化（Solidity, Rust）',
        'DeFi 協議設計與實現',
        'NFT 標準與市場開發',
        '跨鏈橋接與互操作性',
        'Layer 2 擴容解決方案',
      ],
    },
    // 开始之前
    commitment: {
      title: '開始之前，請確認',
      step: '步驟',
      completed: '已完成',
      of: '/',
      transparency: {
        title: '關於透明度',
        options: [
          '我理解項目需要透明溝通',
          '我願意分享項目真實情況',
          '我認同透明度有助於項目成功',
          '我準備好進行開放對話',
        ],
      },
      role: {
        title: '項目角色',
        options: [
          '我是項目的創始人/聯合創始人',
          '我是項目的核心決策者',
          '我有項目的主要決策權',
          '我可以代表項目做決定',
        ],
      },
      goal: {
        title: '項目目標',
        options: [
          '我希望獲得專業指導',
          '我想避免常見的技術陷阱',
          '我希望能節省開發時間',
          '我重視專業建議的價值',
        ],
      },
      preparation: {
        title: '準備情況',
        options: [
          '我已經準備好項目基本信息',
          '我可以提供項目技術需求',
          '我了解項目的預算範圍',
          '我已經準備好開始評估',
        ],
      },
      action: {
        title: '下一步行動',
        options: [
          '我準備好進入下一步',
          '我理解評估流程',
          '我願意投入時間配合',
          '我期待獲得評估結果',
        ],
      },
      getFreeAssessment: '免費獲得專業的技術評估',
      allStepsCompleted: '所有步驟已完成！',
    },
    // 我们能做什么
    reciprocity: {
      title: '我們能為您做什麼',
      description: '我們會直接告訴你：',
      benefits: [
        '你的想法是否值得做',
        '哪些功能不值得花錢',
        '哪些地方最容易踩坑',
      ],
      getFreeAssessment: '免費獲得專業的技術評估',
    },
    // 立即开始
    easyAccess: {
      title: '立即開始',
      getImmediately: {
        title: '立即獲取',
        desc: '快速開始您的項目評估',
        button: '開始申請',
      },
      contactUs: {
        title: '聯繫我們',
        desc: '快速了解項目可行性',
        button: '聯繫我們',
      },
      custom: {
        title: '定制方案',
        desc: '了解評估報告格式',
        button: '定制方案',
      },
    },
    // 评估表单
    assessment: {
      title: '專業的技術評估',
      subtitle: '請回答以下問題，幫助我們更好地了解您的項目需求',
      resultTitle: '評估結果',
      resultSubtitle: '基於您提供的信息，AI已為您生成專業評估',
      generating: 'AI 正在生成評估...',
      waiting: '等待 AI 生成評估...',
      step: '步驟',
      completed: '已完成',
      of: '/',
      projectDescription: '項目簡介',
      projectDescriptionPlaceholder: '例如：我們正在開發一個基於以太坊的 DeFi 借貸平台，主要面向中小企業和個人用戶，提供去中心化的借貸服務...',
      projectDescriptionHint: '請簡要描述您的項目，包括項目目標、核心功能、目標用戶等信息（可選，但建議填寫以獲得更準確的評估）',
      characters: '字符',
      submitAssessment: '提交評估',
      moreAssessment: '需要更多評估？',
      contactProfessional: '聯繫專業客服',
      allStepsCompleted: '所有信息已填寫完成！請點擊"提交評估"完成申請。',
      // 问题
      questions: {
        chain: {
          title: '你的項目是什麼鏈',
          options: [
            'Ethereum',
            'Polygon',
            'BSC (Binance Smart Chain)',
            'Arbitrum',
            'Optimism',
            'Avalanche',
            'Solana',
            '其他',
          ],
        },
        projectType: {
          title: '你的項目什麼類型',
          options: [
            'DeFi (去中心化金融)',
            'NFT (非同質化代幣)',
            'GameFi (遊戲化金融)',
            'DAO (去中心化自治組織)',
            'Web3 基礎設施',
            '跨鏈橋接',
            'Layer 2 解決方案',
            '其他',
          ],
        },
        revenueSource: {
          title: '項目收益來自哪裡',
          options: [
            '交易手續費',
            '代幣發行與銷售',
            '流動性挖礦獎勵',
            'NFT 交易佣金',
            '訂閱或會員費用',
            '廣告收入',
            '其他',
          ],
        },
        projectStage: {
          title: '你的項目現在處於哪個階段',
          options: [
            '概念階段（只有想法）',
            '開發階段（正在開發中）',
            '測試階段（測試網運行）',
            '主網上線（已上線）',
            '運營階段（已有用戶）',
          ],
        },
        coreGoal: {
          title: '了解核心目標/需求',
          options: [
            '融資（尋求投資）',
            '技術落地（實現技術方案）',
            '社區增長（擴大用戶基礎）',
            '產品優化（改進現有產品）',
            '安全審計（確保項目安全）',
            '市場推廣（提升品牌知名度）',
          ],
        },
        riskPreference: {
          title: '風險偏好',
          options: [
            '保守型（優先安全性，願意犧牲一些創新）',
            '平衡型（在安全性和創新之間平衡）',
            '激進型（追求創新，願意承擔更高風險）',
          ],
        },
      },
    },
    // 错误信息
    errors: {
      rateLimit: '今日評估次數已用完',
      rateLimitTip: '請明天再試',
      submitFailed: '提交失敗',
    },
  },
}

// 支持的语言列表
export const supportedLanguages = ['en', 'zh-CN', 'zh-TW']

// 语言显示名称
export const languageNames = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
}

// 检测用户语言（仅在客户端使用）
export function detectUserLanguage() {
  // SSR 安全检查
  if (typeof window === 'undefined') {
    return 'en'
  }

  // 1. 检查 URL 路径中的语言
  const path = window.location.pathname
  const pathLang = path.split('/')[1]
  if (supportedLanguages.includes(pathLang)) {
    return pathLang
  }

  // 2. 检查 localStorage
  try {
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang && supportedLanguages.includes(savedLang)) {
      return savedLang
    }
  } catch (e) {
    // localStorage 可能不可用
  }

  // 3. 检查浏览器语言
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang && browserLang.startsWith('zh')) {
      // 根据地区判断简体或繁体
      if (browserLang.includes('TW') || browserLang.includes('HK') || browserLang.includes('MO')) {
        return 'zh-TW'
      }
      return 'zh-CN'
    }
  }

  // 4. 默认返回英文
  return 'en'
}

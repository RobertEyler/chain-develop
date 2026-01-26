import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Response } from 'express';

@Injectable()
export class AssessmentService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const baseURL = this.configService.get<string>('AI_API_BASE_URL') || 'https://api.openai.com/v1';
    const apiKey = this.configService.get<string>('AI_API_KEY') || this.configService.get<string>('OPENAI_API_KEY');
    
    if (!apiKey) {
      console.error('AI API Key is missing! Please set AI_API_KEY or OPENAI_API_KEY in .env file');
      console.error('Current environment variables:');
      console.error('AI_API_BASE_URL:', this.configService.get<string>('AI_API_BASE_URL') || 'not set');
      console.error('AI_API_KEY:', this.configService.get<string>('AI_API_KEY') ? '***set***' : 'not set');
      console.error('OPENAI_API_KEY:', this.configService.get<string>('OPENAI_API_KEY') ? '***set***' : 'not set');
      console.error('Working directory:', process.cwd());
      console.error('__dirname:', __dirname);
      throw new Error('AI API Key is required. Please set AI_API_KEY or OPENAI_API_KEY in .env file');
    }
    
    this.openai = new OpenAI({
      apiKey: apiKey,
      baseURL: baseURL,
    });
    
    console.log(`AI API initialized with baseURL: ${baseURL}`);
  }

  // 将选项索引转换为可读文本
  private getOptionText(stepIndex: number, optionIndex: number, language: string = 'en'): string {
    const optionsMapEn: { [key: number]: string[] } = {
      0: ['Ethereum', 'Polygon', 'BSC (Binance Smart Chain)', 'Arbitrum', 'Optimism', 'Avalanche', 'Solana', 'Other'],
      1: ['DeFi (Decentralized Finance)', 'NFT (Non-Fungible Token)', 'GameFi (Gaming Finance)', 'DAO (Decentralized Autonomous Organization)', 'Web3 Infrastructure', 'Cross-Chain Bridge', 'Layer 2 Solution', 'Other'],
      2: ['Trading Fees', 'Token Issuance & Sales', 'Liquidity Mining Rewards', 'NFT Trading Commission', 'Subscription or Membership Fees', 'Advertising Revenue', 'Other'],
      3: ['Concept Stage (Only Ideas)', 'Development Stage (In Development)', 'Testing Stage (Testnet Running)', 'Mainnet Launch (Launched)', 'Operation Stage (Has Users)'],
      4: ['Fundraising (Seeking Investment)', 'Technical Implementation (Implementing Technical Solutions)', 'Community Growth (Expanding User Base)', 'Product Optimization (Improving Existing Products)', 'Security Audit (Ensuring Project Security)', 'Market Promotion (Enhancing Brand Awareness)'],
      5: ['Conservative (Prioritize Security, Willing to Sacrifice Some Innovation)', 'Balanced (Balance Between Security and Innovation)', 'Aggressive (Pursue Innovation, Willing to Take Higher Risks)'],
    };

    const optionsMapZhCN: { [key: number]: string[] } = {
      0: ['Ethereum', 'Polygon', 'BSC (Binance Smart Chain)', 'Arbitrum', 'Optimism', 'Avalanche', 'Solana', '其他'],
      1: ['DeFi (去中心化金融)', 'NFT (非同质化代币)', 'GameFi (游戏化金融)', 'DAO (去中心化自治组织)', 'Web3 基础设施', '跨链桥接', 'Layer 2 解决方案', '其他'],
      2: ['交易手续费', '代币发行与销售', '流动性挖矿奖励', 'NFT 交易佣金', '订阅或会员费用', '广告收入', '其他'],
      3: ['概念阶段（只有想法）', '开发阶段（正在开发中）', '测试阶段（测试网运行）', '主网上线（已上线）', '运营阶段（已有用户）'],
      4: ['融资（寻求投资）', '技术落地（实现技术方案）', '社区增长（扩大用户基础）', '产品优化（改进现有产品）', '安全审计（确保项目安全）', '市场推广（提升品牌知名度）'],
      5: ['保守型（优先安全性，愿意牺牲一些创新）', '平衡型（在安全性和创新之间平衡）', '激进型（追求创新，愿意承担更高风险）'],
    };

    const optionsMapZhTW: { [key: number]: string[] } = {
      0: ['Ethereum', 'Polygon', 'BSC (Binance Smart Chain)', 'Arbitrum', 'Optimism', 'Avalanche', 'Solana', '其他'],
      1: ['DeFi (去中心化金融)', 'NFT (非同質化代幣)', 'GameFi (遊戲化金融)', 'DAO (去中心化自治組織)', 'Web3 基礎設施', '跨鏈橋接', 'Layer 2 解決方案', '其他'],
      2: ['交易手續費', '代幣發行與銷售', '流動性挖礦獎勵', 'NFT 交易佣金', '訂閱或會員費用', '廣告收入', '其他'],
      3: ['概念階段（只有想法）', '開發階段（正在開發中）', '測試階段（測試網運行）', '主網上線（已上線）', '營運階段（已有用戶）'],
      4: ['融資（尋求投資）', '技術落地（實現技術方案）', '社群增長（擴大用戶基礎）', '產品優化（改進現有產品）', '安全審計（確保專案安全）', '市場推廣（提升品牌知名度）'],
      5: ['保守型（優先安全性，願意犧牲一些創新）', '平衡型（在安全性和創新之間平衡）', '激進型（追求創新，願意承擔更高風險）'],
    };

    let optionsMap: { [key: number]: string[] };
    let fallback: string;
    
    if (language === 'zh-CN') {
      optionsMap = optionsMapZhCN;
      fallback = '未知';
    } else if (language === 'zh-TW') {
      optionsMap = optionsMapZhTW;
      fallback = '未知';
    } else {
      optionsMap = optionsMapEn;
      fallback = 'Unknown';
    }

    return optionsMap[stepIndex]?.[optionIndex - 1] || fallback;
  }

  // 流式输出方法
  async createStream(createAssessmentDto: any, user: any, language: string, res: Response) {
    try {
      // 从用户信息中获取 Telegram 联系方式（如果已登录）
      const telegramContact = user 
        ? (user.username ? `@${user.username}` : user.name || `ID: ${user.id}`)
        : language === 'en' ? 'Anonymous user' : language === 'zh-CN' ? '未登录用户' : '未登錄用戶';

      // 根据语言构建项目信息文本和提示词
      let projectInfo: string;
      let systemPrompt: string;
      
      if (language === 'zh-CN') {
        projectInfo = `
项目信息：
- 链：${this.getOptionText(0, createAssessmentDto.chain, language)}
- 项目类型：${this.getOptionText(1, createAssessmentDto.projectType, language)}
- 收益来源：${this.getOptionText(2, createAssessmentDto.revenueSource, language)}
- 项目阶段：${this.getOptionText(3, createAssessmentDto.projectStage, language)}
- 核心目标：${this.getOptionText(4, createAssessmentDto.coreGoal, language)}
- 风险偏好：${this.getOptionText(5, createAssessmentDto.riskPreference, language)}
${createAssessmentDto.projectDescription && createAssessmentDto.projectDescription.trim() ? `\n项目简介：\n${createAssessmentDto.projectDescription.trim()}` : ''}
        `.trim();
        systemPrompt = '你是一个web3项目的评估人，现在有一个项目，需要你从商业上，可行性上，周期及费用上进行评估。请用简体中文回答。';
      } else if (language === 'zh-TW') {
        projectInfo = `
專案資訊：
- 鏈：${this.getOptionText(0, createAssessmentDto.chain, language)}
- 專案類型：${this.getOptionText(1, createAssessmentDto.projectType, language)}
- 收益來源：${this.getOptionText(2, createAssessmentDto.revenueSource, language)}
- 專案階段：${this.getOptionText(3, createAssessmentDto.projectStage, language)}
- 核心目標：${this.getOptionText(4, createAssessmentDto.coreGoal, language)}
- 風險偏好：${this.getOptionText(5, createAssessmentDto.riskPreference, language)}
${createAssessmentDto.projectDescription && createAssessmentDto.projectDescription.trim() ? `\n專案簡介：\n${createAssessmentDto.projectDescription.trim()}` : ''}
        `.trim();
        systemPrompt = '你是一個web3專案的評估人，現在有一個專案，需要你從商業上，可行性上，週期及費用上進行評估。請用繁體中文回答。';
      } else {
        projectInfo = `
Project Information:
- Chain: ${this.getOptionText(0, createAssessmentDto.chain, language)}
- Project Type: ${this.getOptionText(1, createAssessmentDto.projectType, language)}
- Revenue Source: ${this.getOptionText(2, createAssessmentDto.revenueSource, language)}
- Project Stage: ${this.getOptionText(3, createAssessmentDto.projectStage, language)}
- Core Goal: ${this.getOptionText(4, createAssessmentDto.coreGoal, language)}
- Risk Preference: ${this.getOptionText(5, createAssessmentDto.riskPreference, language)}
${createAssessmentDto.projectDescription && createAssessmentDto.projectDescription.trim() ? `\nProject Description:\n${createAssessmentDto.projectDescription.trim()}` : ''}
        `.trim();
        systemPrompt = 'You are a Web3 project evaluator. Now there is a project that needs to be evaluated from business, feasibility, timeline, and cost perspectives. Please respond in English.';
      }
      
      const stream = await this.openai.chat.completions.create({
        model: this.configService.get<string>('AI_MODEL') || this.configService.get<string>('OPENAI_MODEL') || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: projectInfo },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        stream: true, // 启用流式输出
      });

      // 逐块发送数据
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          // 使用 Server-Sent Events 格式发送
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      // 发送结束标记
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error('AI评估失败:', error);
      // 根据语言发送错误信息
      let errorMessage: string;
      if (language === 'zh-CN') {
        errorMessage = error.message || 'AI评估服务暂时不可用，请稍后重试';
      } else if (language === 'zh-TW') {
        errorMessage = error.message || 'AI評估服務暫時不可用，請稍後重試';
      } else {
        errorMessage = error.message || 'AI assessment service is temporarily unavailable, please try again later';
      }
      res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
      res.end();
    }
  }
}

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
  private getOptionText(stepIndex: number, optionIndex: number): string {
    const optionsMap: { [key: number]: string[] } = {
      0: ['Ethereum', 'Polygon', 'BSC (Binance Smart Chain)', 'Arbitrum', 'Optimism', 'Avalanche', 'Solana', '其他'],
      1: ['DeFi (去中心化金融)', 'NFT (非同质化代币)', 'GameFi (游戏化金融)', 'DAO (去中心化自治组织)', 'Web3 基础设施', '跨链桥接', 'Layer 2 解决方案', '其他'],
      2: ['交易手续费', '代币发行与销售', '流动性挖矿奖励', 'NFT 交易佣金', '订阅或会员费用', '广告收入', '其他'],
      3: ['概念阶段（只有想法）', '开发阶段（正在开发中）', '测试阶段（测试网运行）', '主网上线（已上线）', '运营阶段（已有用户）'],
      4: ['融资（寻求投资）', '技术落地（实现技术方案）', '社区增长（扩大用户基础）', '产品优化（改进现有产品）', '安全审计（确保项目安全）', '市场推广（提升品牌知名度）'],
      5: ['保守型（优先安全性，愿意牺牲一些创新）', '平衡型（在安全性和创新之间平衡）', '激进型（追求创新，愿意承担更高风险）'],
    };

    return optionsMap[stepIndex]?.[optionIndex - 1] || '未知';
  }

  // 流式输出方法
  async createStream(createAssessmentDto: any, user: any, res: Response) {
    try {
      // 从用户信息中获取 Telegram 联系方式（如果已登录）
      const telegramContact = user 
        ? (user.username ? `@${user.username}` : user.name || `ID: ${user.id}`)
        : '未登录用户';

      // 构建项目信息文本
      const projectInfo = `
项目信息：
- 链：${this.getOptionText(0, createAssessmentDto.chain)}
- 项目类型：${this.getOptionText(1, createAssessmentDto.projectType)}
- 收益来源：${this.getOptionText(2, createAssessmentDto.revenueSource)}
- 项目阶段：${this.getOptionText(3, createAssessmentDto.projectStage)}
- 核心目标：${this.getOptionText(4, createAssessmentDto.coreGoal)}
- 风险偏好：${this.getOptionText(5, createAssessmentDto.riskPreference)}
${createAssessmentDto.projectDescription && createAssessmentDto.projectDescription.trim() ? `\n项目简介：\n${createAssessmentDto.projectDescription.trim()}` : ''}
      `.trim();

      // 调用OpenAI API（流式）
      const systemPrompt = '你是一个web3项目的评估人，现在用有有一个项目，需要你从商业上，可行性上，周期及费用上进行评估';
      
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
      // 发送错误信息
      res.write(`data: ${JSON.stringify({ error: error.message || 'AI评估服务暂时不可用，请稍后重试' })}\n\n`);
      res.end();
    }
  }
}

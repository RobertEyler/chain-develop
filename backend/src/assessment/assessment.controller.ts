import { Controller, Post, Body, Request, Res, UseInterceptors } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { RateLimitInterceptor } from './rate-limit.interceptor';
import { Response } from 'express';

@Controller('assessment')
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  @Post()
  @UseInterceptors(RateLimitInterceptor)
  async create(
    @Body() createAssessmentDto: CreateAssessmentDto,
    @Request() req,
    @Res() res: Response,
  ) {
    // 支持可选认证：如果已登录，使用用户信息；否则使用匿名
    const user = req.user || null;
    
    // 获取语言（从 Accept-Language 请求头）
    const language = req.headers['accept-language'] || 'en';
    
    // 设置流式响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // 禁用 Nginx 缓冲
    
    // 调用流式服务
    await this.assessmentService.createStream(createAssessmentDto, user, language, res);
  }
}

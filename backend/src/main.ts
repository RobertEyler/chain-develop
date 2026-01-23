import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 获取配置服务
  const configService = app.get(ConfigService);
  
  // 启用 CORS（支持流式响应）
  // 从环境变量读取允许的域名列表
  const allowedOriginsStr = configService.get<string>('ALLOWED_ORIGINS') || 
    configService.get<string>('FRONTEND_URL') || 
    'http://localhost:5173';
  
  const allowedOrigins = allowedOriginsStr
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
  
  // 是否允许所有 Cloudflare 域名
  const allowCloudflareDomains = configService.get<string>('ALLOW_CLOUDFLARE_DOMAINS') === 'true';
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  app.enableCors({
    origin: (origin, callback) => {
      // 允许没有 origin 的请求（如 Postman、curl 等）
      if (!origin) {
        return callback(null, true);
      }
      
      // 检查是否在允许列表中
      if (allowedOrigins.some(allowed => {
        if (allowed.includes('*')) {
          // 支持通配符匹配
          const pattern = allowed.replace(/\*/g, '.*');
          const regex = new RegExp(`^${pattern}`);
          return regex.test(origin);
        }
        return origin.startsWith(allowed);
      })) {
        return callback(null, true);
      }
      
      // 如果启用了 Cloudflare 域名允许
      if (allowCloudflareDomains || isProduction) {
        if (origin.includes('.workers.dev') || origin.includes('.pages.dev')) {
          return callback(null, true);
        }
      }
      
      // 开发环境允许 localhost
      if (!isProduction) {
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
          return callback(null, true);
        }
      }
      
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Type', 'Cache-Control', 'Connection'],
    maxAge: 86400, // 24小时
  });

  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

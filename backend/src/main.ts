import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 获取配置服务
  const configService = app.get(ConfigService);
  
  // 启用 CORS（支持流式响应）
  const allowedOrigins = [
    configService.get<string>('FRONTEND_URL') || 'http://localhost:5173',
    'http://127.0.0.1',
    'http://127.0.0.1:80',
    'http://localhost:5173',
    'http://localhost:80',
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
        return callback(null, true);
      }
      if (configService.get<string>('NODE_ENV') !== 'production') {
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
          return callback(null, true);
        }
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    exposedHeaders: ['Content-Type', 'Cache-Control', 'Connection'],
  });

  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

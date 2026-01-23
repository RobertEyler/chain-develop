import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// IP 请求记录接口
interface IpRequestRecord {
  count: number;
  date: string; // YYYY-MM-DD 格式
}

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  // 内存存储：IP -> 请求记录
  private ipRecords: Map<string, IpRequestRecord> = new Map();
  private readonly MAX_REQUESTS_PER_DAY = 2;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const clientIp = this.getClientIp(request);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // 获取或创建该 IP 的记录
    const record = this.ipRecords.get(clientIp);

    if (record) {
      // 如果是同一天，检查请求次数
      if (record.date === today) {
        if (record.count >= this.MAX_REQUESTS_PER_DAY) {
          // 计算剩余时间（到明天 00:00:00）
          const now = new Date();
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0);
          const msLeft = tomorrow.getTime() - now.getTime();
          const hoursLeft = Math.floor(msLeft / (1000 * 60 * 60));
          const minutesLeft = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
          
          let tip = '请明天再试';
          if (hoursLeft > 0) {
            tip = `约 ${hoursLeft} 小时${minutesLeft > 0 ? ` ${minutesLeft} 分钟` : ''}后可再次使用`;
          } else if (minutesLeft > 0) {
            tip = `约 ${minutesLeft} 分钟后可再次使用`;
          }
          
          throw new HttpException(
            {
              success: false,
              message: `今日评估次数已用完（${this.MAX_REQUESTS_PER_DAY}次/天）`,
              error: 'RATE_LIMIT_EXCEEDED',
              hoursLeft: hoursLeft,
              minutesLeft: minutesLeft,
              tip: tip,
            },
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        // 增加计数
        record.count++;
      } else {
        // 新的一天，重置计数
        record.count = 1;
        record.date = today;
      }
    } else {
      // 新 IP，创建记录
      this.ipRecords.set(clientIp, {
        count: 1,
        date: today,
      });
    }

    return next.handle();
  }

  // 获取客户端真实 IP
  private getClientIp(request: any): string {
    return (
      request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      request.headers['x-real-ip'] ||
      request.connection?.remoteAddress ||
      request.socket?.remoteAddress ||
      request.ip ||
      'unknown'
    );
  }
}

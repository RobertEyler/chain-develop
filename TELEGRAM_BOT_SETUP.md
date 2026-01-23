# Telegram Bot 设置说明

## 登录流程

1. 用户在前端点击"使用 Telegram 授权登录"按钮
2. 前端生成临时授权 code，打开 Telegram Bot：`tg://resolve?domain=your_bot&start=login_xxx`
3. Bot 收到 `/start login_xxx` 命令，显示登录按钮
4. 用户点击按钮，跳转到前端页面（URL 中包含 code）
5. 前端检测到 code，发送到后端验证
6. 后端验证 code，返回 JWT token

## Bot 实现要求

### 1. 处理 /start 命令

当用户通过 `tg://resolve?domain=your_bot&start=login_xxx` 打开 Bot 时，Bot 会收到 `/start login_xxx` 命令。

**示例代码（Node.js + node-telegram-bot-api）：**

```javascript
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username;
  const firstName = msg.from.first_name;
  const lastName = msg.from.last_name;
  const photoUrl = msg.from.photo_url;
  
  const startParam = match[1]; // 例如: "login_abc123"
  
  if (startParam.startsWith('login_')) {
    const code = startParam.replace('login_', '');
    
    // 1. 调用后端接口，存储用户信息到 code
    const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
    try {
      const storeResponse = await fetch(`${API_BASE_URL}/auth/store-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          userId: userId,
          username: username,
          firstName: firstName,
          lastName: lastName,
          photoUrl: photoUrl,
        }),
      });
      
      const storeResult = await storeResponse.json();
      
      if (storeResult.success) {
        // 2. 构建前端登录页面 URL（包含 code）
        const frontendUrl = process.env.FRONTEND_URL || 'http://127.0.0.1';
        const loginUrl = `${frontendUrl}/#assessment?auth_code=${code}`;
        
        // 3. 发送登录按钮
        bot.sendMessage(chatId, '点击下面的按钮完成登录：', {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '🔐 登录',
                  url: loginUrl,
                },
              ],
            ],
          },
        });
      } else {
        bot.sendMessage(chatId, '登录失败，请重试。');
      }
    } catch (error) {
      console.error('Store code error:', error);
      bot.sendMessage(chatId, '登录服务暂时不可用，请稍后重试。');
    }
  } else {
    // 普通 /start 命令
    bot.sendMessage(chatId, '欢迎使用！');
  }
});
```

### 2. 环境变量

Bot 需要配置以下环境变量：

```env
TELEGRAM_BOT_TOKEN=your-bot-token
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://127.0.0.1
```

### 3. 安装依赖

```bash
npm install node-telegram-bot-api
```

## 完整流程示例

1. **用户点击前端登录按钮**
   - 前端调用 `/auth/generate-code` 生成 code
   - 打开 `tg://resolve?domain=your_bot&start=login_abc123`

2. **Bot 收到命令**
   - Bot 解析 `/start login_abc123`，提取 code: `abc123`
   - Bot 调用 `/auth/store-code`，存储用户信息
   - Bot 发送登录按钮，URL: `http://127.0.0.1/#assessment?auth_code=abc123`

3. **用户点击按钮**
   - 跳转到前端页面，URL 包含 `auth_code=abc123`

4. **前端处理**
   - 检测到 URL 中的 `auth_code` 参数
   - 调用 `/auth/verify-code`，发送 code
   - 后端验证 code，返回 JWT token
   - 前端保存 token，完成登录

## 注意事项

- Code 有效期为 5 分钟
- Code 只能使用一次（验证后会被删除）
- 生产环境建议使用 Redis 或数据库存储 code，而不是内存
- 确保 Bot 可以访问后端 API（CORS 配置）

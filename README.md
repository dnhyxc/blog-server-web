### 文件目录说明

```
blog-server-web
├─ .gitignore
├─ package.json
├─ src 源码
│  ├─ app
│  │  └─ index.js koa 入口配置
│  ├─ config
│  │  └─ index.js 项目常量
│  ├─ constant
│  │  └─ index.js 请求错误配置
│  ├─ controller 路由请求控制器，每个路由都对应有一个控制器
│  │  ├─ article.controller.js 处理文章的控制器
│  │  ├─ classify.controller.js 处理分类、标签、时间轴的控制器
│  │  ├─ comments.controller.js 处理评论的控制器
│  │  ├─ index.js 将所有控制器统一导入 index 中进行导出
│  │  ├─ upload.controller.js 文件上传的控制器
│  │  ├─ user.controller.js 用户登录注册（账号）控制器
│  │  └─ userInfo.controller.js 用户信息控制器
│  ├─ db
│  │  └─ index.js 数据库设置
│  ├─ main.js 项目入口文件
│  ├─ middleware 中间件
│  │  ├─ auth.middleware.js
│  │  ├─ index.js
│  │  └─ user.middleware.js
│  ├─ models mongoose Schema 声明文件
│  │  ├─ article.model.js
│  │  ├─ comments.model.js
│  │  ├─ index.js
│  │  ├─ like.model.js
│  │  ├─ likeArticle.model.js
│  │  └─ user.model.js
│  ├─ router 路由配置
│  │  ├─ article.router.js
│  │  ├─ classify.router.js
│  │  ├─ comments.router.js
│  │  ├─ index.js
│  │  ├─ upload.router.js
│  │  ├─ user.router.js
│  │  └─ userInfo.router.js
│  ├─ service 操作数据库的文件
│  │  ├─ article.service.js
│  │  ├─ classify.service.js
│  │  ├─ comments.service.js
│  │  ├─ index.js
│  │  ├─ like.service.js
│  │  ├─ likeArticle.service.js
│  │  ├─ user.service.js
│  │  └─ userInfo.service.js
├  ├─ upload 文件上传存放区
│  └─ utils 全局工具
│     └─ index.js
└─ yarn.lock
```

### 启动项目

#### 开发环境启动

```
npm start
```

#### 生产环境启动

```
npm run start:prod
```

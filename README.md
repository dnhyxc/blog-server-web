### 文件结构说明

```
blog-server-web
├─ .gitignore
├─ package.json
├─ README.md
├─ src
│  ├─ app 路由、数据库、第三方库注册文件
│  │  └─ index.js
│  ├─ config 全局通用配置文件
│  │  └─ index.js
│  ├─ constant 全局接口返回报错定义
│  │  └─ index.js
│  ├─ controller
│  │  ├─ admin 后台接口控制器
│  │  │  ├─ article.controller.js
│  │  │  └─ user.controller.js
│  │  ├─ index.js
│  │  └─ web 前台接口控制器
│  │     ├─ article.controller.js
│  │     ├─ classify.controller.js
│  │     ├─ comments.controller.js
│  │     ├─ upload.controller.js
│  │     ├─ user.controller.js
│  │     └─ userInfo.controller.js
│  ├─ db 数据口配置文件
│  │  └─ index.js
│  ├─ main.js 入口文件
│  ├─ middleware 中间件
│  │  ├─ auth.middleware.js
│  │  ├─ index.js
│  │  └─ user.middleware.js
│  ├─ models
│  │  ├─ admin 前台文档Schema
│  │  │  ├─ article.model.js
│  │  │  ├─ index.js
│  │  │  └─ user.model.js
│  │  ├─ index.js
│  │  └─ web 后台文档Schema
│  │     ├─ article.model.js
│  │     ├─ comments.model.js
│  │     ├─ like.model.js
│  │     ├─ likeArticle.model.js
│  │     └─ user.model.js
│  ├─ router
│  │  ├─ admin 后台路由配置
│  │  │  ├─ article.router.js
│  │  │  ├─ index.js
│  │  │  └─ user.router.js
│  │  └─ web 前台路由配置
│  │     ├─ article.router.js
│  │     ├─ classify.router.js
│  │     ├─ comments.router.js
│  │     ├─ index.js
│  │     ├─ upload.router.js
│  │     ├─ user.router.js
│  │     └─ userInfo.router.js
│  ├─ service
│  │  ├─ admin 后台数据库操作文件
│  │  │  ├─ article.service.js
│  │  │  └─ user.service.js
│  │  ├─ index.js
│  │  └─ web 前台数据库操作文件
│  │     ├─ article.service.js
│  │     ├─ classify.service.js
│  │     ├─ comments.service.js
│  │     ├─ like.service.js
│  │     ├─ likeArticle.service.js
│  │     ├─ user.service.js
│  │     └─ userInfo.service.js
│  └─ utils 全局状态码配置
│     └─ index.js
└─ yarn.lock
```

export interface securityInterface {
  secretKey?: string; // jwt的secretKey
  expiresIn?: number; // jwt的失效时间
}

export interface databaseInterface {
  dbName: string; // 数据库名称
  host: string; // 数据库地址
  port: number; // 数据库端口
  user: string; // 数据库用户名
  password?: string; // 数据库密码
}

export interface configInterface {
  environment?: string; // 环境变量
  database: databaseInterface; // 数据库配置
  security: securityInterface; // token生成配置
}

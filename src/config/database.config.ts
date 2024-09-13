import { ConfigType, registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { env, envBoolean, envNumber } from "~/global/env";


const dataSourceOptions: DataSourceOptions = {
  type: 'mysql', 
  host: env('DB_HOST', 'localhost'),
  port: envNumber('DB_PORT', 3306),
  username: env('DB_USERNAME', 'root'),
  password: env('DB_PASSWORD', 'root'),
  database: env('DB_DATABASE', 'dance_admin'),
  synchronize: envBoolean('DB_SYNCHRONIZE', true), // 同步自动加载的模型
  multipleStatements: true, // 允许多条语句同时执行
  entities: ['dist/modules/**/*.entity{.ts,.js}'], // 实体文件路径
  migrations: ['dist/migrations/*{.ts,.js}'], // 迁移文件路径
  subscribers: ['dist/subscribers/*{.ts,.js}'], // 订阅者文件路径
}

export const dbRegToken = 'database'

export const DatabaseConfig = registerAs(dbRegToken, (): DataSourceOptions => dataSourceOptions)

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, LoggerOptions } from "typeorm";
import { ConfigKeyPaths, IDatabaseConfig } from "~/config";
import { TypeORMLogger } from "~/config/typeorm-logger";
import { env } from "~/global/env";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        let loggerOptions:LoggerOptions = env('DB_LOGGING') as 'all'

        try {
          loggerOptions = JSON.parse(loggerOptions)
        } catch {}


        return {
          ...configService.get<IDatabaseConfig>('database'),
          autoLoadEntities: true,
          logging: loggerOptions,
          logger: new TypeORMLogger(loggerOptions)
        }
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize()
        return dataSource
      }
    })
  ],
  providers: [],
  exports: []
})

export class DatabaseModule {}
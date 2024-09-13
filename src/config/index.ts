import { IDatabaseConfig, dbRegToken, DatabaseConfig } from './database.config'
import { ISecurityConfig, SecurityConfig, securityRegToken } from './security.config'

export * from './security.config'
export * from './database.config'

export interface AllConfigType {
  [securityRegToken]: ISecurityConfig
  [dbRegToken]: IDatabaseConfig
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>

export default {
  SecurityConfig,
  DatabaseConfig
}

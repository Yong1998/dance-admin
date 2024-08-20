import { ISecurityConfig, SecurityConfig, securityRegToken } from './security.config'

export * from './security.config'

export interface AllConfigType {
  [securityRegToken]: ISecurityConfig
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>

export default {
  SecurityConfig,
}

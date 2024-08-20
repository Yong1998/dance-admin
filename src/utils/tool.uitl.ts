import { nanoid } from 'nanoid'

export function generateUUID(size: number = 21): string {
  return nanoid(size)
}

// 睡眠函数
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

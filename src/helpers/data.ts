import { isPlainObject } from './util'

// json字符串data
export function transformRequest(data: any): any {
  return isPlainObject(data) ? JSON.stringify(data) : data
}

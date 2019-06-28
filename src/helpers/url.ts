import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    // 过滤值为null 或者为 undefined的参数
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values: string[]

    // Array.isArray() 用于确定传递的值是否是一个 Array。
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        // 格式为: YYYY-MM-DDTHH:mm:ss.sssZ
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      // 字符串数组 例如 key=val形式
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex > -1) {
      /**
       * slice()用于提取原数组的一部分，返回一个新数组，原数组不变。
       * 第一个参数为起始位置（从0开始），如参数是负数，则表示倒数计算的位置。
       * 第二个参数为终止位置（但该位置的元素本身不包括在内），如参数是负数，则表示倒数计算的位置。
       * 如果省略第二个参数，则一直返回到原数组的最后一个成员。负数表示倒数第几个。
       * 如果参数值大于数组成员的个数，或者第二个参数小于第一个参数，则返回空数组。
       */
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') > -1 ? '&' : '?') + serializedParams
  }

  return url
}

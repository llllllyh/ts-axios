import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      // 获取所有请求头信息
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    // 处理网络异常错误
    request.onerror = function handleError() {
      reject(createError('Network Error!', config, null, request))
    }

    // 处理超时错误 0为永不超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}

/**
 * 当请求被发送到服务器时，我们需要执行一些基于响应的任务。
 * 每当 readyState 改变时，就会触发 onreadystatechange 事件。
 * readyState 属性存有 XMLHttpRequest 的状态信息。
 * 下面是 XMLHttpRequest 对象的三个重要的属性：
 * onreadystatechange:存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
 * readyState:存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
 *   0: 请求未初始化
 *   1: 服务器连接已建立
 *   2: 请求已接收
 *   3: 请求处理中
 *   4: 请求已完成，且响应已就绪
 * status：200: "OK" 404: 未找到页面
 */

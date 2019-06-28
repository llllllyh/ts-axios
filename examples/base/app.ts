import axios from '../../src/index'

// // 测试传人参数为数组
// axios({
//   method:'get',
//   url:'/base/get',
//   params:{
//     foo:['bar','xxx']
//   }
// })

// // 测试传入参数为字符串
// axios({
//   method:'get',
//   url:'/base/get',
//   params:{
//     foo:'xxx'
//   }
// })

// // 测试传入参数为date类型
// const date = new Date()
// axios({
//   method:'get',
//   url:'/base/get',
//   params:{
//     date
//   }
// })

// // 测试参数为符号
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })
// // 过滤值为null参数
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })
// // 测试去除字符串有hash时
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })
// // 测试url已有参数的情况下
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
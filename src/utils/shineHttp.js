import axios from 'axios'
// import qs from 'qs'
// import { Message, Loading } from 'element-ui'
import { Message } from 'element-ui'
import router from '../router/index'

// 接口返回状态码
const resultCode = {RESPONSE_SUCCESS: '000000'}

// 定义了一个loading
// let loadingInstance

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // loadingInstance = Loading.service({
  //   fullscreen: true,
  //   lock: true,
  //   text: 'Loading',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.7)'
  // })

  // Alter defaults after instance has been created
  let user = JSON.parse(localStorage.getItem('shine_user'))
  if (user) {
    config.headers['Authorization'] = user.token
  }
  return config
}, function (error) {
  // Do something with request error
  // loadingInstance.close()
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // loadingInstance.close()
  return response
}, function (error) {
  // Do something with response error
  // loadingInstance.close()
  // 请求异常
  if (error.response) {
    checkStatus(error.response)
  } else {
    Message({
      type: 'error',
      message: error.message
    })
  }
  return Promise.resolve(error.response)
})

/**
 * 发送请求公共方法
 * @param cfg
 * @returns {Promise.<TResult>}
 */
const shineHttp = cfg => {
  let config = {

    // 默认'get'请求
    method: cfg.method,

    // 基础请求路径
    baseURL: process.env.BASE_URL,

    url: cfg.url,

    // 请求超时时长
    timeout: 5000,

    transformRequest: [function (data, headers) {
      // Do whatever you want to transform the data
      return data
    }],

    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      return data
    }],

    // `headers` are custom headers to be sent
    headers: {'X-Requested-With': 'XMLHttpRequest'}
  }

  if (config.method === 'get') {
    if (cfg.params) {
      config.params = cfg.params
    }
  } else if (config.method === 'post' || config.method === 'delete') {
    if (cfg.params) {
      // config.data = qs.stringify(cfg.params)
      config.data = JSON.stringify(cfg.params)
    }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }

  return axios(config).then(function (resp) {
    // 请求成功
    // json字符串转json对象
    let result = JSON.parse(resp.data)
    // 接口正常调用时
    if (result.resultCode === resultCode.RESPONSE_SUCCESS) {
      // 若传入了success，则回调success
      if (cfg.success) {
        cfg.success(result)
      }
      // 是否进行消息提醒
      if (cfg.reminder) {
        Message({
          type: 'info',
          message: result.resultInfo
        })
      }
    } else {
      // 反之，若传入了error，则回调error，否则统一处理
      if (cfg.error) {
        cfg.error(result)
      } else {
        // 统一进行消息提醒
        Message({
          type: 'info',
          message: result.resultInfo
        })
      }
    }
  })
  // .catch(function (error) {
  //   console.log(error)
  // // 请求异常
  // if (error.response) {
  //   checkStatus(error.response)
  // } else {
  //   Message({
  //     type: 'error',
  //     message: error.message
  //   })
  // }
  // })
}

/**
 * 判断请求响应状态
 * @param resp
 */
const checkStatus = resp => {
  switch (resp.status) {
    case 401:
      router.push({'path': '/login'})
      break
    case 404:
      router.push({'path': '/404'})
      break
    case 403:
      router.push({'path': '/403'})
      break
    case 500:
    case 503:
    default:
      Message({
        type: 'info',
        message: resp.statusText
      })
  }
}

export default shineHttp

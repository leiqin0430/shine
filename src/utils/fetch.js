import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = '/bagl'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// // Set config defaults when creating the instance
// const instance = axios.create({
//   // baseURL: process.env.BASE_URL,
//   baseURL: process.env.BASE_URL,
//   // baseURL: 'http://192.168.30.116:8080',
//   timeout: 5000,
//   // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//   transformRequest: [function (data, headers) {
//     // Do whatever you want to transform the data
//     if (process.env.BASE_URL) {
//       return qs.stringify(data)
//     } else {
//       return data
//     }
//   }]
// })
//
// // Add a request interceptor
// instance.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   // Alter defaults after instance has been created
//   let user = JSON.parse(localStorage.getItem('user'))
//   if (user) {
//     config.headers.common['Authorization'] = user.token
//   }
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })
//
// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error)
// })
//
// export default instance

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // Alter defaults after instance has been created
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    config.headers.common['Authorization'] = user.token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

const fetch = (cfg, success) => {
  let config = {

    method: cfg.method ? cfg.method : 'get',

    baseURL: process.env.BASE_URL,

    url: cfg.url,

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
    config.params = cfg.params
    // console.log(cfg.params)
    // console.log(qs.stringify(cfg.params))
    // console.log(qs.parse(cfg.params))
  } else {
    config.data = qs.stringify(cfg.params)
  }
  return axios(config).then(function (resp) {
    success(JSON.parse(resp.data))
  }).then(function (error) {
    console.log(error)
  })
}

export default fetch

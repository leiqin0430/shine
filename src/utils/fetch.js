import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = '/bagl'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// Set config defaults when creating the instance
const instance = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: '/api',
  timeout: 5000,
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    console.log(process.env.NODE_ENV)
    // console.log(process.env.BASE_URL)
    // if (process.env.BASE_URL) {
    //   return qs.stringify(data)
    // } else {
    //   return data
    // }
    return qs.stringify(data)
    // return data
  }]
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
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
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance

// export const fetch = function (config) {
//   return axios.create(config)
// }

import axios from 'axios'
// import qs from 'qs'
import base from './base'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// // let base = '/bagl'
// let base = ''

export const requestLogin = params => {
  return axios.post(`${base.baseUrl}/log/in`, base.paramsHandle(params)).then(res => res.data)
}

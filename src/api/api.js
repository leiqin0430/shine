import axios from 'axios'
// import qs from 'qs'
import base from './base'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// // let base = '/bagl'
// let base = ''

export const requestLogin = params => { return axios.post(`${base.baseUrl}/log/in`, base.paramsHandle(params)).then(res => res.data) }

// export const getUserList = params => { return axios.get(`${base}/mrDict/list/RYBQ`) }
//
// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }) }
//
// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }
//
// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }
//
// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }
//
// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }

/**
 * 请求参数格式化处理
 * @param params
 * @returns {*}
 */
// function paramsHandle (params) {
//   if (base !== '') {
//     return qs.stringify(params)
//   } else {
//     return params
//   }
// }

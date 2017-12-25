import axios from 'axios'

let base = ''

export const login = params => { return axios.post(`${base}/log/in`, params).then(res => res.data) }

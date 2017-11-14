import fetch from '@/utils/fetch'

export const requestLogin = function (params, fn) {
  return fetch({
    url: '/log/in',
    method: 'post',
    params: params
    // success: fn
  }, fn)
}

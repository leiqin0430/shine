import fetch from '@/utils/fetch'

export const requestLogin = (params, fn) => {
  return fetch({
    url: '/log/in',
    method: 'post',
    params: params,
    reminder: true,
    success: fn
  })
}

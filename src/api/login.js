import fetch from '@/utils/fetch'

export const requestLogin = params => {
  return fetch({
    url: '/log/in',
    method: 'post',
    data: params
  }).then(resp => resp.data)
}

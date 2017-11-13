import fetch from '@/utils/fetch'

export const getBorrowList = params => {
  return fetch({
    url: '/mrBorrow/list',
    method: 'get',
    params: params
  }).then(resp => resp.data)
}

import fetch from '@/utils/fetch'

export const getBorrowList = (params, fn) => {
  return fetch({
    url: '/mrBorrow/list',
    method: 'get',
    params: params,
    success: fn
  })
  // }).then(resp => resp.data)
}

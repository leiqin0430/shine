import fetch from '@/utils/fetch'

export const getBorrowList = (params, fn1, fn2) => {
  return fetch({
    url: '/mrBorrow/list',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  })
}

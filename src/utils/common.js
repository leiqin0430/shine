
const respResult = {RESPONSE_SUCCESS: '000000'}
const testObj = {k1: 'v1'}
/**
 * 返回当前登录者姓名
 */
const getUserName = function () {
  // return JSON.parse(localStorage.getItem('user')).user.name
  return 'admin'
}

export default { respResult, testObj, getUserName }

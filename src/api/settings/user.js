import shineHttp from '@/utils/shineHttp'
import HttpConfig from '@/bean/HttpConfig'

const getUserList = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/account/list',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  }))
}

const saveUser = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/account/persist',
    method: 'post',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

const delUser = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/account/clear',
    method: 'delete',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

const resetPwd = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/account/reset',
    method: 'post',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

const getUserDeptAuth = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/account/checkedDeptByUid',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  }))
}

const saveUserDeptAuth = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/account/linkUserDept',
    method: 'post',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

const getUserRoleAuth = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/account/checkedRoleByUid',
    method: 'get',
    params: params,
    reminder: false,
    success: fn1,
    error: fn2
  }))
}

const saveUserRoleAuth = (params, fn1, fn2) => {
  return shineHttp(new HttpConfig({
    url: '/account/linkUserRole',
    method: 'post',
    params: params,
    reminder: true,
    success: fn1,
    error: fn2
  }))
}

export default {
  getUserList,
  saveUser,
  delUser,
  resetPwd,
  getUserDeptAuth,
  saveUserDeptAuth,
  getUserRoleAuth,
  saveUserRoleAuth
}

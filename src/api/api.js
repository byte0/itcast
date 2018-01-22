import axios from 'axios'
// 设置请求的基准路径
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1/'
// 登陆拦截器
// 拦截器处理token
axios.interceptors.request.use(function (config) {
  // 获取当前是否存在token
  let token = localStorage.getItem('mytoken')
  if (token) {
    // Authorization 请求头的键是前后台约定
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 实现登录功能
export const login = (params) => {
  return axios.post('login', params).then(res => {
    // 返回具体的数据，用来传递给下一个then
    return res.data
  })
}
// 测试请求头
export const getUsersData = (params) => {
  return axios.get('users', {params: params}).then(res => {
    return res.data
  })
}
// 用户管理-状态改变
export const toggleUserState = (params) => {
  // restful /users/512/state/true
  return axios.put('users/' + params.uId + '/state/' + params.state).then(res => {
    return res.data
  })
}
// 用户管理-添加用户提交表单
export const addUser = (params) => {
  return axios.post('users', params).then(res => {
    return res.data
  })
}
// 用户管理-更加id查询数据
export const getUserById = (params) => {
  return axios.get('users/' + params.id).then(res => {
    return res.data
  })
}
// 用户管理-编辑用户提交表单
export const editUser = (params) => {
  return axios.put('users/' + params.id, params).then(res => {
    return res.data
  })
}
// 用户管理-删除用户
export const deleteUser = (params) => {
  return axios.delete('users/' + params.id).then(res => {
    return res.data
  })
}
// 权限管理-权限列表
export const rightList = (params) => {
  return axios.get('rights/' + params.type).then(res => {
    return res.data
  })
}

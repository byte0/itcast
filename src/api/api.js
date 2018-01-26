import axios from 'axios'
// 设置请求的基准路径
// axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1/'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
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
// 权限管理-角色列表
export const roleList = () => {
  return axios.get('roles').then(res => {
    return res.data
  })
}
// 权限管理-添加角色
export const addRole = (params) => {
  return axios.post('roles', params).then(res => {
    return res.data
  })
}
// 权限管理-根据id查询角色信息
export const getRoleById = (params) => {
  return axios.get('roles/' + params.id).then(res => {
    return res.data
  })
}
// 权限管理-编辑角色
export const editRole = (params) => {
  return axios.put('roles/' + params.id, params).then(res => {
    return res.data
  })
}
// 权限管理-删除角色
export const deleteRole = (params) => {
  return axios.delete('roles/' + params.id).then(res => {
    return res.data
  })
}
// 权限管理-删除指定角色的权限
export const deleteRoleRight = (params) => {
  return axios.delete('roles/' + params.roleId + '/rights/' + params.rightId).then(res => {
    return res.data
  })
}
// 权限管理-提交角色授权
export const submitGrant = (params) => {
  return axios.post('roles/' + params.roleId + '/rights', params).then(res => {
    return res.data
  })
}
// 用户管理-分配角色
export const giveRole = (params) => {
  return axios.put('users/' + params.id + '/role', params).then(res => {
    return res.data
  })
}
// 获取左侧导航菜单列表
export const getMenu = () => {
  return axios.get('menus').then(res => {
    return res.data
  })
}
// 商品管理-分类列表
export const getCategories = (params) => {
  return axios.get('categories', {params: params}).then(res => {
    return res.data
  })
}
// 商品分类-添加分类
export const addCate = (params) => {
  return axios.post('categories', params).then(res => {
    return res.data
  })
}
// 商品分类-根据id查询分类信息
export const getCateById = (params) => {
  return axios.get('categories/' + params.id).then(res => {
    return res.data
  })
}
// 商品分类-编辑提交
export const editCate = (params) => {
  return axios.put('categories/' + params.cat_pid, params).then(res => {
    return res.data
  })
}
// 商品分类-删除提交
export const deleteCate = (params) => {
  return axios.delete('categories/' + params.id).then(res => {
    return res.data
  })
}
// 参数列表-获取参数或者属性
export const getParams = (params) => {
  return axios.get('categories/' + params.id + '/attributes', {params: params}).then(res => {
    return res.data
  })
}
// 参数列表-添加参数或者属性
export const addParams = (params) => {
  return axios.put('categories/' + params.aId + '/attributes/' + params.pId, params).then(res => {
    return res.data
  })
}
// 商品管理-获取商品列表
export const getProducts = (params) => {
  return axios.get('goods', {params: params}).then(res => {
    return res.data
  })
}
// 商品管理-添加商品
export const addProduct = (params) => {
  return axios.post('goods', params).then(res => {
    return res.data
  })
}
// 订单管理-订单列表
export const getOrders = (params) => {
  return axios.get('orders', {params: params}).then(res => {
    return res.data
  })
}

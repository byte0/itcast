import axios from 'axios'

// 实现登录功能
export const login = (params) => {
  return axios.post('http://47.96.21.88:8888/api/private/v1/login', params).then(res => {
    // 返回具体的数据
    return res.data
  })
}

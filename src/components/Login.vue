<template>
  <div>
    <!-- 表单 -->
    <h1>登录</h1>
    <ul>
      <li>
        <label for="uname">用户名：</label>
        <input type="text" v-model='username' id="uname">
      </li>
      <li>
        <label for="pw">密码：</label>
        <input type="text" v-model='password' id="pw">
      </li>
      <li>
        <input type="button" value="提交" @click='login'>
      </li>
    </ul>
  </div>
</template>

<script>
import {login} from '../api/api.js'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      // 调用登录接口
      let params = {
        username: this.username,
        password: this.password
      }
      // 调用接口，提交用户登录信息
      login(params).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          // 存储token
          localStorage.setItem('mytoken', res.data.token)
          // 登录成功，跳转到主页
          this.$router.push({name: 'home'})
        } else {
          // 登录失败，提示一下用户
          console.log('用户名或者密码错误')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

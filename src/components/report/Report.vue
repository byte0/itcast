<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">数据统计</div>
    <v-charts></v-charts>
  </div>
</template>
<script>
import charts from './MyCharts.vue'
export default {
  data () {
    return {
      border: true,
      tableData: [{
        code: 'auto01',
        aname: '用户列表',
        date: '2016-05-01'
      }, {
        code: 'auto02',
        aname: '权限管理',
        date: '2016-05-01'
      }, {
        code: 'auto03',
        aname: '角色管理',
        date: '2016-05-01'
      }]
    }
  },
  components: {
    'v-charts': charts
  }
}
</script>
<style scoped>
  .el-table {
    margin-top: 10px;
  }
  .title {
    margin-top: 10px;
    height: 45px;
    line-height: 45px;
    background-color: #D7E2EF;
    padding-left: 10px;
  }
</style>

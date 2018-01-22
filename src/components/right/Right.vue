<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        width="180"
        label="路径">
      </el-table-column>
      <el-table-column
        prop="level"
        width="180"
        label="层级">
        <template slot-scope='scope'>
          <span v-if='scope.row.level === "0"'>一级</span>
          <span v-else-if='scope.row.level === "1"'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {rightList} from '../../api/api.js'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    // 初始化数据列表
    rightList({type: 'list'}).then(res => {
      if (res.meta.status === 200) {
        this.tableData = res.data
      }
    })
  }
}
</script>
<style scoped>
  .el-breadcrumb {
    background-color: #D3DCE6;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
</style>

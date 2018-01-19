<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-input placeholder="请输入内容" class="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
    </div>
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
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        width="180"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        width="180"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        width="180"
        label="用户状态">
        <template slot-scope="scope">
          <!-- 作用域插槽，可以定制数据显示 -->
          <el-switch @change='toggleUser(scope.row)' v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        width="280"
        label="操作">
        <template slot-scope="scope">
          <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
          <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
          <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import {getUsersData, toggleUserState} from '../../api/api.js'
export default {
  data () {
    return {
      currentPage: 1, // 当前页码
      pagesize: 5, // 每页显示条数
      total: 0, // 数据总条数
      tableData: [] // 实际的表格列表数据
    }
  },
  methods: {
    toggleUser (data) {
      // 改变用户状态
      toggleUserState({
        uId: data.id, // 用户id
        state: data.mg_state // 用户当前状态
      }).then(res => {
        if (res.meta.status === 200) {
          // 操作成功
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
        }
      })
    },
    handleSizeChange (val) {
      // 改变每页显示条数
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      // 改变当前页码
      this.currentPage = val
      this.initList()
    },
    initList () {
      // 初始化数据列表
      getUsersData({
        query: '',
        pagenum: this.currentPage,
        pagesize: this.pagesize
      }).then(res => {
        if (res.meta.status === 200) {
          this.tableData = res.data.users
          this.total = res.data.total
          this.currentPage = res.data.pagenum
        }
      })
    }
  },
  mounted () {
    // 首次加载页面，初始化表格数据
    this.initList()
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
  .el-pagination {
    background-color: #D3DCE6;
    padding-top: 10px;
    height: 35px;
    line-height: 35px;
  }
  .search {
    width: 300px;
  }
</style>

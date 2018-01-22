<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-input v-model='query' placeholder="请输入内容" class="search">
        <el-button @click='queryHandler' slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click='dialogVisible4Add = true'>添加用户</el-button>
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
          <el-button @click='editHandler(scope.row)' size='small' type="primary" icon="el-icon-edit"></el-button>
          <el-button @click='deleteHandler(scope.row)' size='small' type="danger" icon="el-icon-delete"></el-button>
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
    <!-- 添加用户弹窗 -->
    <el-dialog
      title="添加用户"
      @close='closeUserDialog("add")'
      :visible="dialogVisible4Add"
      width="50%">
      <el-form ref="userform" :rules="rules" :model="user" label-width="80px">
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop='mobile'>
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4Add = false">取 消</el-button>
        <el-button type="primary" @click="submitUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户弹窗 -->
    <el-dialog
      title="编辑用户"
      @close='closeUserDialog("edit")'
      :visible="dialogVisible4Edit"
      width="50%">
      <el-form ref="userform4Edit" :rules="rules" :model="euser" label-width="80px">
        <el-form-item label="用户名" prop='username'>
          <el-button plain type="info">{{euser.username}}</el-button>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="euser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop='mobile'>
          <el-input v-model="euser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4Add = false">取 消</el-button>
        <el-button type="primary" @click="submitUser4Edit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getUsersData, toggleUserState, addUser, getUserById, editUser, deleteUser} from '../../api/api.js'
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      euser: {
        id: '',
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      dialogVisible4Add: false,
      dialogVisible4Edit: false,
      query: '',
      currentPage: 1, // 当前页码
      pagesize: 5, // 每页显示条数
      total: 0, // 数据总条数
      tableData: [] // 实际的表格列表数据
    }
  },
  methods: {
    queryHandler () {
      // 关键字搜索
      this.initList()
    },
    deleteHandler (row) {
      // 删除操作
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定要删除，然后调用接口
        deleteUser({id: row.id}).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新列表
            this.initList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editHandler (row) {
      // 根据id查询最新的数据
      getUserById({id: row.id}).then(res => {
        if (res.meta.status === 200) {
          // 填充表单
          this.euser.id = res.data.id
          this.euser.username = res.data.username
          this.euser.email = res.data.email
          this.euser.mobile = res.data.mobile
          // 显示弹窗
          this.dialogVisible4Edit = true
        }
      })
    },
    submitUser4Edit () {
      // 编辑提交用户
      this.$refs['userform4Edit'].validate(valid => {
        if (valid) {
          // 提交表单
          editUser(this.euser).then(res => {
            if (res.meta.status === 200) {
              // 关闭窗口
              this.dialogVisible4Edit = false
              // 刷新列表
              this.initList()
            }
          })
        }
      })
    },
    submitUser () {
      // 提交用户信息
      this.$refs['userform'].validate(valid => {
        if (valid) {
          // 表单验证通过，调用接口
          addUser(this.user).then(res => {
            if (res.meta.status === 201) {
              // 关闭弹窗
              this.dialogVisible4Add = false
              // 刷新列表
              this.initList()
            }
          })
        }
      })
    },
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
    closeUserDialog (flag) {
      // 关闭添加用户弹窗
      if (flag === 'add') {
        this.dialogVisible4Add = false
      } else {
        this.dialogVisible4Edit = false
      }
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
        query: this.query,
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

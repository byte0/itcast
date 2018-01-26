<template>
  <div>
    <div>
      <el-input v-model='query' placeholder="请输入内容" class="search">
        <el-button @click='queryHandler' slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click='toAddProduct'>添加商品</el-button>
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
        prop="goods_name"
        label="商品名称"
        width="380">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        width="80"
        label="商品价格">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        width="80"
        label="商品重量">
      </el-table-column>
      <el-table-column
        prop="add_time"
        width="100"
        label="时间">
      </el-table-column>
      <el-table-column
        width="280"
        label="操作">
        <template slot-scope="scope">
          <el-button @click='editHandler(scope.row)' size='small' type="primary" icon="el-icon-edit"></el-button>
          <el-button @click='deleteHandler(scope.row)' size='small' type="danger" icon="el-icon-delete"></el-button>
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
import {getProducts} from '../../api/api.js'
export default {
  data () {
    return {
      tableData: [],
      query: '',
      pagesize: 5,
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    toAddProduct () {
      // 跳转到添加商品页面
      this.$router.push({name: 'add'})
    },
    queryHandler () {
      console.log(1)
    },
    editHandler (row) {
      this.$router.push({name: 'edit', params: {id: row.goods_id}})
    },
    deleteHandler () {
      console.log(3)
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
      getProducts({
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pagesize
      }).then(res => {
        if (res.meta.status === 200) {
          this.total = res.data.total
          this.tableData = res.data.goods
        }
      })
    }
  },
  mounted () {
    this.initList()
  }
}
</script>
<style>
  .search {
    width: 300px;
  }
</style>

<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <el-input v-model='query' placeholder="请输入搜索内容" class="input-with-select">
          <el-button slot="append" @click='queryData' icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click='addDialogVisible = true' type="success" plain>测试订单</el-button>
      </el-col>
    </el-row>
    <el-table
      border: border
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        label="#"
        type="index"
        :width="tabWidths[0]">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        :width="tabWidths[1]">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        :width="tabWidths[2]">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="下单用户"
        :width="tabWidths[3]">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款"
        :width="tabWidths[4]">
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        :width="tabWidths[5]">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间"
        :width="tabWidths[6]">
      </el-table-column>
      <el-table-column label="操作" :width="tabWidths[7]">
        <template slot-scope="scope">
          <el-button plain title="订单编辑" type="primary" size="small" @click="editOrder(scope.row)" icon="el-icon-edit"></el-button>
          <el-button plain title="物流信息" type="warning" size="small" @click="queryInfo(scope.row)" icon="el-icon-location-outline"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 快递信息 -->
    <el-dialog
      title="快递信息"
      :visible.sync="expressDialogVisible">
      <el-row :key='item.order_id' v-for='item in expressInfo'>
        <el-col :span="6">{{item.time}}</el-col>
        <el-col :span="2"><i class="el-icon-time"></i></el-col>
        <el-col :span="16">{{item.context}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="expressDialogVisible = false">关闭</el-button>
      </span>
      <bd-map :pname='currentPosition'></bd-map>
    </el-dialog>
    <!-- 修改地址 -->
    <el-dialog
      title="修改地址"
      :visible.sync="orderDialogVisible">
      <div>
        <pcb-select></pcb-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialogVisible = false">关闭</el-button>
        <el-button @click="orderDialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getOrders} from '../../api/api.js'
import BdMap from './BdMap.vue'
import PcbSelect from './Select.vue'
function jsonpFn (options) {
  // 发送jsonp请求
  // https://www.ickd.cn/
  let defaults = {
    url: '',
    jsonp: 'callback'
  }
  for (let attr in options) {
    defaults[attr] = options[attr]
  }
  let jsonpCallback = 'cb'
  let script = document.createElement('script')
  script.src = defaults.url + '&' + defaults.jsonp + '=' + jsonpCallback
  window[jsonpCallback] = function (data) {
    defaults.success(data)
  }
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}
export default {
  data () {
    return {
      total: 0,
      query: '',
      page: 1,
      pagesize: 10,
      border: true,
      expressDialogVisible: false,
      orderDialogVisible: false,
      keyword: '',
      tabWidths: [50, 260, 80, 100, 80, 80, 120, 150],
      expressInfo: [],
      currentPosition: '北京',
      tableData: []
    }
  },
  methods: {
    editOrder () {
      this.orderDialogVisible = true
    },
    queryInfo () {
      // 调用第三方接口获取数据
      jsonpFn({
        url: 'https://biz.trace.ickd.cn/auto/887211469648646531?mailNo=887211469648646531&spellName=&exp-textName=&ts=123456&enMailNo=123456789&callback=_jqjsp&_1516972306350=',
        success: (result) => {
          this.expressInfo = result.data
          this.expressDialogVisible = true
        }
      })
    },
    handleSizeChange (val) {
      // 每页条数变化
      this.pagesize = val
      this.initData()
    },
    handleCurrentChange (val) {
      // 页码变化
      this.page = val
      this.initData()
    },
    queryData () {
      this.initData()
    },
    initList () {
      let param = {pagenum: this.page, pagesize: this.pagesize, query: this.query}
      getOrders(param).then(res => {
        if (res.meta.status === 200) {
          this.tableData = res.data.goods
          this.total = res.data.total
        }
      })
    }
  },
  mounted () {
    this.initList()
  },
  components: {
    BdMap,
    PcbSelect
  }
}
</script>
<style scoped>
  .el-breadcrumb {
    background-color: #D3DCE6;
    height: 45px;
    font-size: 15px;
    padding-left: 10px;
    line-height: 45px;
  }
  .el-input {
    width: 300px;
  }
  .page {
    background-color: #D3DCE6;
    height: 40px;
    padding-top: 5px;
  }
</style>

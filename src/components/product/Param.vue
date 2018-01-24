<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-cascader
        :options="cateList"
        v-model="selectedOptions"
        :props='propsDefine'
        @change="handleChange"
        :show-all-levels="false">
      </el-cascader>
    </div>
    <el-tabs type="border-card" :value='nowTab' @tab-click='toggleTab'>
      <el-tab-pane label="动态参数" name='dynamic'>
        <div>
          <el-button type="success" plain>添加参数</el-button>
          <el-table
            border
            :data="dtableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="#"
              width="50">
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
              width="180">
            </el-table-column>
            <el-table-column
              width="280"
              label="操作">
              <template slot-scope="scope">
                <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
                <el-button size='small' type="danger" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="静态属性" name='static'>
        <div>
          <el-button type="success" plain>添加属性</el-button>
          <el-table
            border
            :data="stableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="#"
              width="50">
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
              width="180">
            </el-table-column>
            <el-table-column
              width="280"
              label="操作">
              <template slot-scope="scope">
                <el-button size='small' type="primary" icon="el-icon-edit"></el-button>
                <el-button size='small' type="danger" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {getCategories, getParams} from '../../api/api.js'
export default {
  data () {
    return {
      nowTab: 'dynamic',
      cateList: [],
      selectedOptions: [],
      propsDefine: {
        value: 'cat_id',
        label: 'cat_name'
      },
      dtableData: [],
      stableData: []
    }
  },
  methods: {
    toggleTab (obj) {
      this.nowTab = obj.name
      console.log(this.nowTab)
      // 切换选项卡操作
      let str = this.nowTab === 'dynamic' ? 'dtableData' : 'stableData'
      this._getParamsData(str)
    },
    _getParamsData (abc) {
      let len = this.selectedOptions.length
      if (len !== 3) {
        this.$message({
          type: 'error',
          message: '必须选择三级分类'
        })
        return
      }
      let cid = this.selectedOptions[2]
      let flag = this.nowTab === 'dynamic' ? 'many' : 'only'
      getParams({id: cid, sel: flag}).then(res => {
        if (res.meta.status === 200) {
          console.log(abc + '-------------')
          this[abc] = res.data
        }
      })
    },
    handleChange () {
      // 选中分类的时候调用参数接口
      this._getParamsData('dtableData')
    },
    initListParam () {
      getCategories({type: 3}).then(res => {
        if (res.meta.status === 200) {
          this.cateList = res.data
        }
      })
    }
  },
  mounted () {
    this.initListParam()
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

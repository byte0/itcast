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
            <el-table-column type="expand">
              <template slot-scope='scope'>
                <el-tag
                  :key="index"
                  v-for="(tag, index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                  v-focus
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
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
import {getCategories, getParams, addParams} from '../../api/api.js'
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
    showInput (row) {
      // 点击按钮显示输入框
      row.inputVisible = true
    },
    handleClose () {
      // 处理标签删除操作
    },
    handleInputConfirm (row) {
      // 添加标签内容
      row.attr_vals.push(row.inputValue)
      // 保存标签输入内容
      addParams({
        aId: row.cat_id,
        pId: row.attr_id,
        attr_sel: 'many',
        attr_name: row.attr_name,
        attr_vals: row.attr_vals.join(',')
      }).then(res => {
        console.log(res)
        // 设置输入域隐藏，按钮显示
        row.inputVisible = false
      })
    },
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
      // 获取参数或者属性数据
      getParams({id: cid, sel: flag}).then(res => {
        if (res.meta.status === 200) {
          // 对数据进行二次加工(把数组中的所有对象中的attr_vals属性变成数组)
          this[abc] = res.data.map(item => {
            // this.hello = 123 如果直接向data中添加属性，那么不是响应式的，必须使用$set添加响应式属性
            // 每行添加两个属性，用于控制输入框的显示和值
            // (响应式属性的值如果是对象，那么它的子属性默认也是响应式)
            item.inputVisible = false
            item.inputValue = ''
            // $set添加的属性是响应式的
            // this.$set(item, 'inputVisible', false)
            // this.$set(item, 'inputValue', '')
            // 把字符串变成数组
            item.attr_vals = item.attr_vals.split(',')
            return item
          })
        }
      })
    },
    handleChange () {
      // 选中分类的时候调用参数接口
      this._getParamsData(this.nowTab)
    },
    initListParam () {
      // 获取所有分类数据
      getCategories({type: 3}).then(res => {
        if (res.meta.status === 200) {
          this.cateList = res.data
        }
      })
    }
  },
  mounted () {
    this.initListParam()
  },
  directives: {
    focus: {
      inserted: function (el) {
        console.dir(el)
        // 自定义指令获取焦点
        el.children[0].focus()
      }
    }
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

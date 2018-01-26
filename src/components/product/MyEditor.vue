<template>
  <script :id=id type="text/plain"></script>
</template>
<script>
// import '../../../static/editor/ueditor.config.js'
// import '../../../static/editor/ueditor.all.min.js'
// import '../../../static/editor/lang/zh-cn/zh-cn.js'
// 在webpack环境下，全局变量必须通过window获取，不可以直接获取
const UE = window.UE
export default {
  name: 'my-editor',
  data () {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    },
    id: {
      type: String
    }
  },
  mounted () {
    const _this = this
    // 初始化编辑器
    this.editor = UE.getEditor(this.id, this.config)
    this.editor.addListener('ready', function () {
      // 富文本UI渲染后之后，填充数据
      _this.editor.setContent(_this.defaultMsg)
    })
  },
  methods: {
    getUEContent () {
      // 获取内容
      return this.editor.getContent()
    },
    setUEContent () {
      this.editor.setContent(this.defaultMsg)
    }
  },
  destroyed () {
    // 销毁编辑器
    this.editor.destroy()
  }
}
</script>

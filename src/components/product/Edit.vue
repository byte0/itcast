<template>
  <div>
    <div>edit</div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    initProduct (id) {
      console.log(id)
    }
  },
  mounted () {
    let id = this.$route.params.id
    this.initProduct(id)
  }
}
</script>
<style>

</style>

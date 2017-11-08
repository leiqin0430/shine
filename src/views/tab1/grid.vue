<template>
  <h2>{{msg}}</h2>
</template>
<script>
  export default {
    name: 'grid',
    data () {
      console.log(this.$router)
      return {
        msg: 'Welcome to grid tab!'
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>

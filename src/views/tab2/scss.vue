<template>
  <div>
    <h1>{{ msg }}</h1>
    <!-- 在 HTML 中使用 kebab-case -->
    <child my-message="hello!"></child>
  </div>
</template>

<script>
  export default {
    name: 'scss',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../styles/_variable";
  h1 {
    font-weight: normal;
    color: $primary-color;
  }
</style>

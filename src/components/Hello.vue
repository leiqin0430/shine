<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button v-on:click="say('hi')">Say hi</button>
      <button v-on:click="login('what')">Say what</button>
    </div>
  </div>
</template>

<script>
import { requestLogin, getUserList } from '../api/api'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    say: function (message) {
//      alert(message)
      getUserList().then((res) => {
        alert(JSON.stringify(res))
      })
    },
    login: function (message) {
//      alert(message)
      let params = new URLSearchParams()
      params.append('accountNo', 'admin')
      params.append('password', '123456')
      requestLogin(params).then(data => {
        alert(JSON.stringify(data))
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../styles/_variable";
  h1, h2 {
    font-weight: normal;
    color: $primary-color;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

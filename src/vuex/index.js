import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 2,
    AUTH_TOKEN: ''
  },
  mutations: {
    increment: function (ss) {
      ss.count++
    },
    decrement: function (ss) {
      ss.count--
    },
    setToken: function (state, token) {
      state.AUTH_TOKEN = token
    }
  }
})

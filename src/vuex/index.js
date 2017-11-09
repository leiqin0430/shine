import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 2
  },
  mutations: {
    increment: function (ss) {
      ss.count++
    },
    decrement: function (ss) {
      ss.count--
    }
  }
})

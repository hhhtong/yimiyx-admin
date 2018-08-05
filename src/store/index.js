import Vue from 'vue'
import Vuex from 'vuex'
import { state, getters } from './variables'
import { mutations, actions } from './methods'
import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    app
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
// import * as types from '../mutation-types'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store

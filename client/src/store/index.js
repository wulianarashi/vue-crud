import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions  from './action'
import mutations from './mutation'
import getters from './getter'

//保存vuex数据刷新消失的插件
import createPersistedState  from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})

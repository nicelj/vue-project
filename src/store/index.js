import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  name: 'Max'
}
const actions = {
  async showAllInfo ({commit}) {
    console.log('action showall')
  }
}
const mutations = {
  showAll (state, payload) {
    console.log(state.name)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})

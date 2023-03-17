import Vue from 'vue';
import Vuex from 'vuex';
import state from './state'
import actions from './actions'
import mutations from './mutations'

import errorLog from './errorLog'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
		errorLog 
	},
	// 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  
	strict: debug
});
export default store

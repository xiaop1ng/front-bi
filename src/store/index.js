import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import router from './modules/router'

Vue.use(Vuex)

const state = {
    curPonit: {},
    curTougu: {},
    testdata: '0'
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
		router
	}
})

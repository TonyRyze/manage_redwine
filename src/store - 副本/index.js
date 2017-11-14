import Vue from 'vue'
import Vuex from 'vuex'
import { INCREMENT } from './mutation-types'

Vue.use(Vuex)

const state = {
	count: 1,
	todos: [1,2,3,4,5,6,7]
}

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	// getters,
	// actions,
	mutations: {
		[INCREMENT] (state, payload) {
			state.count += payload.amount
		}
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo > 3)
		}
	}
})

if (module.hot) {
	module.hot.accept([
	  	'./getters',
	  	'./actions',
	  	'./mutations'
	], () => {
		store.hotUpdate({
			getters: require('./getters'),
			actions: require('./actions'),
			mutations: require('./mutations')
		})
	})
}

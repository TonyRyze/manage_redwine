import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import addProduct from './modules/addProduct'
import breadCrumb from './modules/breadCrumb'
import editProduct from './modules/editProduct'
import banner from './modules/banner'
import addActive from './modules/addActive'
import editActive from './modules/editActive'
import withSnapshot from '@/plugins/withSnapshot'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	strict: debug,
	actions,
	getters,
	modules: {
		addProduct,
		breadCrumb,
		editProduct,
		banner,
		addActive,
		editActive
	},
	plugins: debug ? [withSnapshot] : []
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

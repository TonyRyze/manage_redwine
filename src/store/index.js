import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import addProduct from './modules/addProduct'
import breadCrumb from './modules/breadCrumb'
import editProduct from './modules/editProduct'
import banner from './modules/banner'
import addActive from './modules/addActive'
import login from './modules/login'
import editActive from './modules/editActive'
import addRecruitment from './modules/addRecruitment'
import withSnapshot from '@/plugins/withSnapshot'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	strict: debug,
	actions,
	getters,
	modules: {
		login,
		addProduct,
		breadCrumb,
		editProduct,
		banner,
		addActive,
		editActive,
		addRecruitment
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

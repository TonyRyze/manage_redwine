import Vue from 'vue'
import Router from 'vue-router'
const Index = r => require.ensure([], () => r(require('@/views/Index')), 'index')
const AddProduct = r => require.ensure([], () => r(require('@/views/AddProduct')), 'addproduct')
const EditProduct = r => require.ensure([], () => r(require('@/views/EditProduct')), 'editproduct')
const Banner = r => require.ensure([], () => r(require('@/views/Banner')), 'banner')
const EditBanner = r => require.ensure([], () => r(require('@/views/EditBanner')), 'editbanner')
const AddActive = r => require.ensure([], () => r(require('@/views/AddActive')), 'addactive')
const EditActive = r => require.ensure([], () => r(require('@/views/EditActive')), 'editactive')

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/addproduct',
			name: 'AddProduct',
			component: AddProduct
		},
		{
			path: '/editproduct',
			name: 'EditProduct',
			component: EditProduct
		},
		{
			path: '/banner',
			name: 'Banner',
			component: Banner
		},
		{
			path: '/editbanner',
			name: 'EditBanner',
			component: EditBanner
		},
		{
			path: '/addactive',
			name: 'AddActive',
			component: AddActive
		},
		{
			path: '/editactive',
			name: 'EditActive',
			component: EditActive
		}
	]
})

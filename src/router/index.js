import Vue from 'vue'
import Router from 'vue-router'
const Index = r => require.ensure([], () => r(require('@/views/Index')), 'index')
const AddProduct = r => require.ensure([], () => r(require('@/views/AddProduct')), 'addproduct')
const EditProduct = r => require.ensure([], () => r(require('@/views/EditProduct')), 'editproduct')
const Banner = r => require.ensure([], () => r(require('@/views/Banner')), 'banner')
const EditBanner = r => require.ensure([], () => r(require('@/views/EditBanner')), 'editbanner')
const AddActive = r => require.ensure([], () => r(require('@/views/AddActive')), 'addactive')
const EditActive = r => require.ensure([], () => r(require('@/views/EditActive')), 'editactive')
const NotFoundPage = r => require.ensure([], () => r(require('@/views/NotFoundPage')), '404')

Vue.use(Router)

const router =  new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index,
			meta: {
				keepAlive: false,
				requireAuth: false
			}
		},
		{
			path: '/addproduct',
			name: 'AddProduct',
			component: AddProduct,
			meta: { 
				keepAlive: true,
				requireAuth: true
			}
		},
		{
			path: '/editproduct',
			name: 'EditProduct',
			component: EditProduct,
			meta: { 
				keepAlive: false,
				requireAuth: true
			}
		},
		{
			path: '/banner',
			name: 'Banner',
			component: Banner,
			meta: { 
				keepAlive: true,
				requireAuth: true
			}
		},
		{
			path: '/editbanner',
			name: 'EditBanner',
			component: EditBanner,
			meta: { 
				keepAlive: false,
				requireAuth: true
			}
		},
		{
			path: '/addactive',
			name: 'AddActive',
			component: AddActive,
			meta: { 
				keepAlive: true,
				requireAuth: true
			}
		},
		{
			path: '/editactive',
			name: 'EditActive',
			component: EditActive,
			meta: { 
				keepAlive: false,
				requireAuth: true
			}
		},
		{ 
			path: '*', 
			component: NotFoundPage,
			meta: { 
				keepAlive: true,
				requireAuth: true
			}
		}
	]
})

// 在每个路由生效之前，先进行一些处理，请参考 vue-router官方文档-导航钩子
router.beforeEach((to, from, next) => {
  // 对 to.matched 数组中的每个路由调用箭头函数
  const localAccount = localStorage.getItem('account') || '';
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断登录状态
    if (localAccount && localAccount.length) {
      // 继续路由
      next()
    } else {
      // 重定向到登录界面
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 继续路由
    next()
  }
})

export default router;

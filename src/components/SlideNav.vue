<template>
	<div class="slide-nav">
		<el-menu default-active="1" router class="el-menu-vertical-demo" @select="CRUMBCHANGE" theme="dark">
			<el-menu-item index="1" :route="{
					path: '/'
				}">首页</el-menu-item>
			<el-submenu index="2">
				<template slot="title">产品管理</template>
				<el-menu-item index="2-1" :route="{
					path: 'addproduct'
				}">添加产品</el-menu-item>
				<el-menu-item index="2-2" :route="{
					path: 'editproduct'
				}">编辑产品</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">首页轮播</template>
				<el-menu-item index="3-1" :route="{
					path: 'banner'
				}">添加banner图</el-menu-item>
				<el-menu-item index="3-2" :route="{
					path: 'editbanner'
				}">编辑banner图</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">活动管理</template>
				<el-menu-item index="4-1" :route="{
					path: 'addactive'
				}">添加活动</el-menu-item>
				<el-menu-item index="4-2" :route="{
					path: 'editactive'
				}">编辑活动</el-menu-item>
			</el-submenu>
			<el-menu-item index="5" :route="{
					path: 'messageview'
				}">留言板</el-menu-item>
			<el-submenu index="6">
				<template slot="title">公告管理</template>
				<el-menu-item index="6-1">添加公告</el-menu-item>
				<el-menu-item index="6-2">编辑公告</el-menu-item>
			</el-submenu>
			<el-submenu index="7">
				<template slot="title">招聘管理</template>
				<el-menu-item index="7-1">添加职位</el-menu-item>
				<el-menu-item index="7-2">编辑职位</el-menu-item>
			</el-submenu>
			
		</el-menu>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'

	export default {

		name: 'slideNav',

		data(){
			return {
				
			}
		},

		mounted(){
			
		},

		computed: {
			
		},

		methods:{
			...mapMutations([
				'CRUMBCHANGE'
			])
		},

		components: {
			
		}
	}
</script>

<style>
  	
</style>

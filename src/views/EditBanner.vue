<template>
	<div class="rw-banner" v-loading="loading">
		<div class="banner-list">
			<el-row :gutter="20" v-for="(item, index) in bannerData" class="v-list" :key="item.name">
		  		<el-col :span="20">
					<div class="grid-content bg-purple">
						<img :src="item.url" alt=""/>
					</div>
				</el-col>
			  	<el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<el-button type="danger" @click="handleDelete(index)">删除</el-button>
				  	</div>
			  	</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'
	import cloneDepp from 'clone-deep'
	import { mapMutations, mapState } from 'vuex'

	export default {

		name: 'EditBanner',

		data(){
			return {
				bannerUrl: 'http://localhost:3001/getbanner/',
				delBannerUrl: 'http://localhost:3001/deletebanner/',
				loading: false,
				bannerData: []
			}
		},

		computed: {
			
		},

		methods: {
			
			getBanner: function(){
				const _this = this;
		        axios({
		          method: 'get',
		          url: _this.bannerUrl
		        })
		        .then(function(response) {
		          _this.loading = false;
		          _this.bannerData = response.data;
		        })
		        .catch(function (error) {
		          _this.loading = false;
		          _this.$message.error('获取数据失败，请刷新重试！');
		          console.log(error);
		        });
			},

			handleDelete(index){
		        let _this = this;
		        this.$confirm('此操作将删除该张首页轮播图, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          _this.loading = true;
		          console.log(this.bannerData[index])
		          axios({
		            method: 'post',
		            url: _this.delBannerUrl,
		            data: {
		              name: _this.bannerData[index].name,
		            }
		          })
		          .then(function(response) {
		            _this.loading = false;
		            _this.bannerData.splice(index, 1);
		            _this.$message({
		              type: 'success',
		              message: '删除成功!'
		            });
		          })
		          .catch(function (error) {
		            _this.loading = false;
		            _this.$message.error('删除失败，请重试！');
		            console.log(error);
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    }
			
		},

		mounted(){
			this.getBanner();
		},

		components: {
			
		}
	}
</script>

<style scoped>
	.banner-list img{
		width: 100%;
		height: 300px;
	}
	.v-list{
		margin-bottom: 60px;
	}
	.el-button{
		margin-top: 114px;
	}
</style>

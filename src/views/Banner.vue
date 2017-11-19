<template>
	<div class="rw-product" v-loading="loading">
		<div class="product-form">
			<el-form ref="eleForm" label-width="80px" :model="this.banner" :rules="rules" enctype="multipart/form-data">
				<el-form-item label="上传banner图" prop="bannerImage" label-width="120px">
					<el-upload
						accept="image/jpeg,image/jpg,image/png"
						class="upload-demo"
						name="bannerImage"
						multiple
						ref="bannerImageUpload"
						list-type="picture"
						:action="postFileUrl"
						:on-change="bannerhandleChange"
						:on-remove="bannerhandleChange"
						:on-error="bannerhandleError"
						:before-upload="bannerhandleBefore"
						:auto-upload="false"
						:file-list="bannerImage">
						<el-button size="small" type="primary">点击上传banner图</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在首页banner图</div>
					</el-upload>
				</el-form-item>
				<el-form-item label-width="130px">
					<el-button type="primary" @click="onSubmits('eleForm')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'
	import cloneDepp from 'clone-deep'
	import { mapMutations, mapState } from 'vuex'
	import Conf from '@/config'

	export default {

	name: 'Banner',

	data(){
		return {
			actions: Conf.api.postbanner,
			postFileUrl: Conf.api.postfile,
			loading: false,
			rules: {
				bannerImage: [
					{
						required: true,
						validator: (rule,value,callback) => {

							let isRepeat = false,

								limitSize = 500,

								nameArr = value.map(item => {

									item = JSON.parse(item);
									return item.name;

								}),

								tooLarge = value.some(item => {

									item = JSON.parse(item);
									return item.size/1024 > limitSize;

								}),

							setArr = new Set(nameArr); //去重复  
							
							isRepeat = setArr.size < nameArr.length ? true: false; 

							if(!value.length){
								this.$message.error('请至少上传一张banner图');
							} else if(tooLarge){
								this.$message.error(`上传文件超过${limitSize}KB，请重新上传！`);
							} else if(isRepeat){
								this.$message.error('请不要上传同名图片');
							} else{
								callback();
							}

						},
						trigger: 'blur,change'
					}
				]
				}
			}
		},

		computed: {

			...mapState({
				banner: state => state.banner.banner,
				breadCrumb: state => state.breadCrumb
			}),

			bannerImage: {
				get() {
					return cloneDepp(this.banner.bannerImage)
				},
				set(value) {
					this.$store.commit('UPDATEBANNERIMAGE', value)
				}
			}
		},

		methods: {

			onFileChange(file, fileList, type){

				let fileArray = fileList.map((v, i) => {

					return JSON.stringify(fileList[i])

				});
				
				this.$store.commit({
			        type: type,
			        fileList: fileArray,
			    });

			},

			bannerhandleChange(file, fileList) {

				this.onFileChange(file, fileList, 'UPDATEBANNERIMAGE');

			},

			bannerhandleBefore(file){
				
				// 占空

			},

			bannerhandleError(err, file, fileList){
				
				this.$message.error(`${file.name} 文件上传失败，请重新上传`);

			},

		    onSubmits(formName){

		    	const data = cloneDepp(this.banner),
		    		  _this = this;

		    	this.$refs[formName].validate((valid) => {

		    		if (valid) {
		    			this.loading = true;
		    			axios.post(this.postFileUrl)
		    			.then(function(response){

		    				axios({
			    				method: 'post',
			    				url: _this.actions,
			    				data: data.bannerImage,
			    				timeout: 10000,
			    			})
			    			.then(function(response) {

			    				setTimeout(function(){

			    					_this.loading = false;

			    					if(response.data === 'success'){

			    						_this.$message.success('您已成功上传一条产品！');

			    						_this.$refs.bannerImageUpload.submit();

										_this.$store.commit('EMPTYBANNER');

			    					} else if(response.data === 'isRepeat'){

			    						_this.$message.warning('这张图片的名字和已上传图片名字冲突，请选择新的图片上传！');

			    					}

			    				}, 1000);
			    				
			    			})
			    			.catch(function (error) {
			    				_this.loading = false;
			    				_this.$message.error('上传失败，请重新上传！');
			    				console.log(error);
			    			});
		    			})
		    			.catch(function(error){
		    				_this.loading = false;
		    				_this.$message.error('上传失败，请重新上传！');
			    			console.log(error);
		    			});

		    		} else {
		    			return false;
		    		}
		    	});

		    }
		},

		mounted(){
			this.$nextTick(() => {
				this.$store.commit('INITCRUMB', ['首页轮播','添加banner图'])
	      	});
		},

		components: {
			
		}
	}
</script>

<style scoped>
	.product-form{
		padding: 20px 0 0 150px;
	}
	.el-input{
		width: 40%;
		max-width: 297px;
		min-width: 218px;
	}
	.el-textarea{
		width: 60%;
		max-width: 445px;
		min-width: 327px;
	}
	.form-ele-item{
		margin-top: 30px;
	}
	.upload-demo{
		margin: 0 0 30px 8px;
		max-width: 560px;
	}
</style>

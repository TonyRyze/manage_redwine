<template>
	<div class="rw-product" v-loading="loading">
		<div class="product-form">
			<el-form ref="eleForm" label-width="80px" :model="this.actives" :rules="rules" enctype="multipart/form-data">
				<el-form-item label="活动标题" prop="titleFirst" label-width="110px">
					<el-input v-model="titleFirst"></el-input>
				</el-form-item>
				<el-form-item label="活动简介" prop="titleSecond" label-width="110px">
					<el-input type="textarea" resize="none" :rows="6" v-model="titleSecond"></el-input>
				</el-form-item>
				<el-form-item label="上传小图" prop="listImg" label-width="100px">
					<el-upload
						accept="image/jpeg,image/jpg,image/png"
						class="upload-demo"
						name="avtiveSimage"
						multiple
						ref="activeSmallIamgeUpload"
						list-type="picture"
						:action="postFileUrl"
						:on-change="activeSmallhandleChange"
						:on-remove="activeSmallhandleChange"
						:on-error="activeSmallhandleError"
						:before-upload="activeSmallhandleBefore"
						:auto-upload="false"
						:file-list="listImg">
						<el-button size="small" type="primary">点击上传小图</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在首页活动小图</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="上传大图" prop="detailImg" label-width="100px">
					<el-upload
						accept="image/jpeg,image/jpg,image/png"
						class="upload-demo"
						name="avtiveBimage"
						multiple
						ref="activeLargeIamgeUpload"
						list-type="picture"
						:action="postFileUrl"
						:on-change="activeLargehandleChange"
						:on-remove="activeLargehandleChange"
						:on-error="activeLargehandleError"
						:before-upload="activeLargehandleBefore"
						:auto-upload="false"
						:file-list="detailImg">
						<el-button size="small" type="primary">点击上传大图</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在首页活动详情图</div>
					</el-upload>
				</el-form-item>
				<el-form-item label-width="110px">
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

	export default {

	name: 'rwActive',

	data(){
		return {
			actions: 'http://localhost:3001/uploadactives/',
			postFileUrl: 'http://localhost:3001/postfile/',
			loading: false,
			rules: {
				titleFirst: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入活动标题"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
				],
				titleSecond: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入活动简介"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
				],
				listImg: [
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
								this.$message.error('请上传一张小图');
							} else if(tooLarge){
								this.$message.error(`上传文件超过${limitSize}KB，请重新上传！`);
							} else if(value.length > 1){
								this.$message.warning('小图只能上传一张！');
							} else{
								callback();
							}

						},
						trigger: 'blur,change'
					}
				],
				detailImg: [
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
								this.$message.error('请至少上传一张详情图');
							} else if(tooLarge){
								this.$message.error(`上传文件超过${limitSize}KB，请重新上传！`);
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
				actives: state => state.addActive.actives
			}),

			listImg: {
				get() {
					return cloneDepp(this.actives.listImg)
				},
				set(value) {
					this.$store.commit('UPDATEACTIVELISTIMAGE', value)
				}
			},

			detailImg: {
				get() {
					return cloneDepp(this.actives.detailImg)
				},
				set(value) {
					this.$store.commit('UPDATEACTIVEDTAILIMAGE', value)
				}
			},
			
			titleFirst: {
				get() {
					return this.actives.titleFirst
				},
				set(value) {
					this.$store.commit('UPDATEACTIVETITLEFIRST', value.replace(/\s+/g, ''))
				}
			},

			titleSecond: {
				get() {
					return this.actives.titleSecond
				},
				set(value) {
					this.$store.commit('UPDATEACTIVETITLESECOND', value.replace(/\s+/g, ''))
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

			activeSmallhandleChange(file, fileList) {

				this.onFileChange(file, fileList, 'UPDATEACTIVELISTIMAGE');

			},

			activeSmallhandleBefore(file){
				
				// 占空

			},

			activeSmallhandleError(err, file, fileList){
				
				this.$message.error(`${file.name} 文件上传失败，请重新上传`);

			},


			activeLargehandleChange(file, fileList) {

				this.onFileChange(file, fileList, 'UPDATEACTIVEDTAILIMAGE');

		    },

		    activeLargehandleBefore(file){
				
				// 占空

		    },

		    activeLargehandleError(err, file, fileList){

		    	this.$message.error(`${file.name} 文件上传失败，请重新上传`);

		    },

		    onSubmits(formName){

		    	const data = cloneDepp(this.actives),
		    		  _this = this;

		    	let listImg = data.listImg.map(v => {
		    		let imgArr = JSON.parse(v),
		    				targetObj = {};
		    		targetObj.name = imgArr.name;
		    		return targetObj;
		    	});

		    	data.listImg = Object.assign({}, listImg[0]);

		    	let detailImg = data.detailImg.map(v => {
		    		let imgArr = JSON.parse(v),
		    				targetObj = {};
		    		targetObj.name = imgArr.name;
		    		return targetObj;
		    	});

		    	data.detailImg = Object.assign([], detailImg);

		    	console.log(data)

		    	this.$refs[formName].validate((valid) => {

		    		if (valid) {
		    			this.loading = true;
		    			axios.post(this.postFileUrl)
		    			.then(function(response){

		    				axios({
			    				method: 'post',
			    				url: _this.actions,
			    				data: data,
			    				timeout: 2000,
			    			})
			    			.then(function(response) {

			    				setTimeout(function(){

			    					_this.loading = false;

			    					if(response.data === 'success'){

			    						_this.$message.success('您已成功上传一条产品！');

			    						_this.$refs.activeSmallIamgeUpload.submit();
			    						_this.$refs.activeLargeIamgeUpload.submit();

										_this.$store.commit('EMPTYACTIVE');

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
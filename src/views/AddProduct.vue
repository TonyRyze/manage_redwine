<template>
	<div class="rw-product" v-loading="loading">
		<div class="product-form">
			<el-form ref="eleForm" label-width="80px" :model="this.forms" :rules="rules" enctype="multipart/form-data">
				<el-form-item label="葡萄酒名称" prop="name" label-width="110px">
					<el-input v-model="name"></el-input>
				</el-form-item>
				<el-form-item label="葡萄酒英文名" prop="enName" label-width="110px">
					<el-input v-model="enName"></el-input>
				</el-form-item>
				<el-form-item label="葡萄酒类型" prop="types" label-width="110px">
					<el-input v-model="types"></el-input>
				</el-form-item>
				<el-form-item label="葡萄酒产国" prop="country" label-width="110px">
					<el-input v-model="country"></el-input>
				</el-form-item>
				<el-form-item label="葡萄酒产地" prop="area" label-width="110px">
					<el-input v-model="area"></el-input>
				</el-form-item>
				<el-form-item label="葡萄酒介绍" prop="intros" label-width="110px">
					<el-input type="textarea" resize="none" :rows="6" v-model="intros"></el-input>
				</el-form-item>
				<el-form-item label="上传小图" prop="smallImage" label-width="100px">
					<el-upload
						accept="image/jpeg,image/jpg,image/png"
						class="upload-demo"
						name="simage"
						multiple
						ref="smallIamgeUpload"
						list-type="picture"
						:action="postFileUrl"
						:on-change="smallhandleChange"
						:on-remove="smallhandleChange"
						:on-error="smallhandleError"
						:before-upload="smallhandleBefore"
						:auto-upload="false"
						:file-list="smallImage">
						<el-button size="small" type="primary">点击上传小图</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在首页产品小图</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="上传大图" prop="largerImage" label-width="100px">
					<el-upload
						accept="image/jpeg,image/jpg,image/png"
						class="upload-demo"
						name="bimage"
						multiple
						ref="largeIamgeUpload"
						list-type="picture"
						:action="postFileUrl"
						:on-change="largehandleChange"
						:on-remove="largehandleChange"
						:on-error="largehandleError"
						:before-upload="largehandleBefore"
						:auto-upload="false"
						:file-list="largerImage">
						<el-button size="small" type="primary">点击上传大图</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在首页产品详情图</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="上传列表图" prop="listImage" label-width="100px">
		          <el-upload
		            accept="image/jpeg,image/jpg,image/png"
		            class="upload-demo"
		            name="limage"
		            multiple
		            ref="listImageUpload"
		            list-type="picture"
		            :action="postFileUrl"
		            :on-change="listhandleChange"
		            :on-remove="listhandleChange"
		            :on-error="listhandleError"
		            :before-upload="listhandleBefore"
		            :auto-upload="false"
		            :file-list="listImage">
		            <el-button size="small" type="primary">点击上传列表图</el-button>
		            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在产品列表页的图</div>
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
	import Conf from '@/config'

	export default {

	name: 'rwProduct',

	data(){
		return {
			actions: Conf.api.uploadwines,
			postFileUrl: Conf.api.postfile,
			loading: false,
			rules: {
				area: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入葡萄酒产地"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
				],
				name: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入葡萄酒名称"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
				],
				types: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入葡萄酒类型"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
				],
				enName: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入葡萄酒英文名"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
				],
				country: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入葡萄酒产国"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
				],
				intros: [
					{
						required: true,
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入葡萄酒介绍"));
							}else{
								callback();
							}
						},
						trigger: 'blur'
					}
				],
				smallImage: [
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
				largerImage: [
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
								this.$message.error('请上传一张详情图');
							} else if(tooLarge){
								this.$message.error(`上传文件超过${limitSize}KB，请重新上传！`);
							} else if(value.length > 1){
								this.$message.warning('大图只能上传一张！');
							} else{
								callback();
							}

						},
						trigger: 'blur,change'
					}
				],
				listImage: [
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
								this.$message.error('请上传一张列表图');
							} else if(tooLarge){
								this.$message.error(`上传文件超过${limitSize}KB，请重新上传！`);
							} else if(value.length > 1){
								this.$message.warning('大图只能上传一张！');
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
				forms: state => state.addProduct.forms,
				breadCrumb: state => state.breadCrumb
			}),

			smallImage: {
				get() {
					return cloneDepp(this.forms.smallImage)
				},
				set(value) {
					this.$store.commit('UPDATESMALLIMAGE', value)
				}
			},

			largerImage: {
				get() {
					return cloneDepp(this.forms.largerImage)
				},
				set(value) {
					this.$store.commit('UPDATELARGERIMAGE', value)
				}
			},

			listImage: {
				get() {
					return cloneDepp(this.forms.listImage)
				},
				set(value) {
					this.$store.commit('UPDATELISTIMAGE', value)
				}
			},
			
			country: {
				get() {
					return this.forms.country
				},
				set(value) {
					this.$store.commit('UPDATECOUNTRY', value.replace(/\s+/g, ''))
				}
			},

			area: {
				get() {
					return this.forms.area
				},
				set(value) {
					this.$store.commit('UPDATEAREA', value)
				}
			},

			name: {
				get() {
					return this.forms.name
				},
				set(value) {
					this.$store.commit('UPDATENAME', value)
				}
			},

			enName: {
				get() {
					return this.forms.enName
				},
				set(value) {
					this.$store.commit('UPDATEENNAME', value)
				}
			},

			types: {
				get() {
					return this.forms.types
				},
				set(value) {
					this.$store.commit('UPDATETYPE', value)
				}
			},

			intros: {
				get() {
					return this.forms.intros
				},
				set(value) {
					this.$store.commit('UPDATEINTROS', value)
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

			smallhandleChange(file, fileList) {

				this.onFileChange(file, fileList, 'UPDATESMALLIMAGE');

			},

			smallhandleBefore(file){
				
				// 占空

			},

			smallhandleError(err, file, fileList){
				
				this.$message.error(`${file.name} 文件上传失败，请重新上传`);

			},


			largehandleChange(file, fileList) {

				this.onFileChange(file, fileList, 'UPDATELARGERIMAGE');

		    },

		    largehandleBefore(file){
				
				// 占空

		    },

		    largehandleError(err, file, fileList){

		    	this.$message.error(`${file.name} 文件上传失败，请重新上传`);

		    },

		    listhandleChange(file, fileList) {

				this.onFileChange(file, fileList, 'UPDATELISTIMAGE');

		    },

		    listhandleBefore(file){
				
				// 占空

		    },

		    listhandleError(err, file, fileList){

		    	this.$message.error(`${file.name} 文件上传失败，请重新上传`);

		    },

		    onSubmits(formName){

		    	const data = cloneDepp(this.forms),
		    		  _this = this;

		    	let smallImage = data.smallImage.map(v => {
		    		let imgArr = JSON.parse(v),
		    				targetObj = {};
		    		targetObj.name = imgArr.name;
		    		return targetObj;
		    	});

		    	data.smallImage = Object.assign({}, smallImage[0])

		    	let largerImage = data.largerImage.map(v => {
		    		let imgArr = JSON.parse(v),
		    				targetObj = {};
		    		targetObj.name = imgArr.name;
		    		return targetObj;
		    	});

		    	data.largerImage = Object.assign({}, largerImage[0])

		    	let listImage = data.listImage.map(v => {
		    		let imgArr = JSON.parse(v),
		    				targetObj = {};
		    		targetObj.name = imgArr.name;
		    		return targetObj;
		    	});

		    	data.listImage = Object.assign({}, listImage[0])

		    	this.$refs[formName].validate((valid) => {

		    		if (valid) {
		    			this.loading = true;
		    			axios.post(this.postFileUrl)
		    			.then(function(response){

		    				axios({
			    				method: 'post',
			    				url: _this.actions,
			    				data: data,
			    				timeout: 10000,
			    			})
			    			.then(function(response) {

		    					_this.loading = false;

		    					if(response.data === 'success'){

		    						_this.$refs.smallIamgeUpload.submit();
		    						_this.$refs.largeIamgeUpload.submit();
		    						_this.$refs.listImageUpload.submit();

		    						_this.$message.success('您已成功上传一条产品！');

									_this.$store.commit('EMPTYFORM');

		    					}
			    				
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
			    this.$store.commit('INITCRUMB', ['产品管理','添加产品'])
			})
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

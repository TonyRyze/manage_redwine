<template>
  <div class="rw-recruitment" v-loading="loading">
		<div class="recruitment-form">
			<el-form ref="eleForm" label-width="80px" :model="this.forms" :rules="rules" enctype="multipart/form-data">
				<el-form-item label="岗位名称" prop="name" label-width="110px">
					<el-input v-model="name"></el-input>
				</el-form-item>
                <el-form-item label="岗位职责" prop="zhize" label-width="110px">
                    <el-input type="textarea" resize="none" :rows="6" v-model="zhize"></el-input>
				</el-form-item>
				<el-form-item label="任职资格" prop="zige" label-width="110px">
					<el-input type="textarea" resize="none" :rows="6" v-model="zige"></el-input>
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

    name: 'rwMessageView',

    data(){
        return {
          actions: Conf.api.uploadrecruitment,
          loading: false,
          rules: {
				name: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入职位名称"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
                ],
                zhize: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入岗位职责"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
                ],
                zige: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入任职资格"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
                ],
            }
        }
    },

    methods: {
        onSubmits(formName){

            const data = cloneDepp(this.forms),
                  _this = this;

            this.$refs[formName].validate((valid) => {

                if (valid) {
                    this.loading = true;
                    axios({
                        method: 'post',
                        url: _this.actions,
                        data: data,
                        timeout: 10000
                    })
                    .then(function(response) {

                        _this.loading = false;

                        if(response.data === 'success'){

                            _this.$message.success('您已成功上传一条职位！');

                            _this.$store.commit('EMPTYRECRUITMENT');

                        }
                    })
                    .catch(function (error) {
                        _this.loading = false;
                        _this.$message.error('上传失败，请重新上传！');
                        console.log(error);
                    })
                } else {
                    return false;
                }
            });

        }
    },

    computed: {
        ...mapState({
            forms: state => state.addRecruitment.recruitment,
            breadCrumb: state => state.breadCrumb
        }),

        name: {
            get() {
                return cloneDepp(this.forms.name)
            },
            set(value) {
                this.$store.commit('UPDATERECRUITMENTNAME', value.replace(/\s+/g, ''))
            }
        },

        zhize: {
            get() {
                return cloneDepp(this.forms.zhize)
            },
            set(value) {
                this.$store.commit('UPDATERECRUITMENTZHIZE', value)
            }
        },

        zige: {
            get() {
                return cloneDepp(this.forms.zige)
            },
            set(value) {
                this.$store.commit('UPDATERECRUITMENTZIGE', value)
            }
        },
    },

    mounted(){
      this.$nextTick(() => {
        this.$store.commit('INITCRUMB', ['招聘管理','添加职位'])
      });
    },

    components: {
        
    }
  }
</script>

<style>
  
</style>

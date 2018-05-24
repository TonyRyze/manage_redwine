<template>
  <div class="rw-recruitment" v-loading="loading">
		<div class="recruitment-form">
			<el-form ref="eleForm" label-width="80px" :model="this.forms" :rules="rules" enctype="multipart/form-data">
				<el-form-item label="公告标题" prop="title" label-width="110px">
					<el-input v-model="title"></el-input>
				</el-form-item>
                <el-form-item label="公告内容" prop="content" label-width="110px">
					<quill-editor 
                        v-model="content" 
                        ref="myQuillEditor"
                    >
                    </quill-editor>
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
  import { quillEditor } from 'vue-quill-editor'
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";

  export default {

    name: 'rwNotice',

    data(){
        return {
          actions: Conf.api.uploadnotice,
          loading: false,
          rules: {
				title: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入公告标题"));
							}else{
								callback();
							}
						},
						trigger: 'blur' 
					}
                ],
                content: [
					{ 
						required: true, 
						validator: (rule,value,callback) => {
							if(/^\s*$/g.test(value) == true){
								callback(new Error("请输入公告内容"));
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

                            _this.$store.commit('EMPTYNOTICE');

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
            forms: state => state.addNotice.notice,
            breadCrumb: state => state.breadCrumb
        }),

        title: {
            get() {
                return cloneDepp(this.forms.title)
            },
            set(value) {
                this.$store.commit('UPDATENOTICETITLE', value.replace(/\s+/g, ''))
            }
        },

        content: {
            get() {
                return cloneDepp(this.forms.content)
            },
            set(value) {
                this.$store.commit('UPDATENOTICECONTENT', value)
            }
        },
    },

    mounted(){
      this.$nextTick(() => {
        this.$store.commit('INITCRUMB', ['公告管理','添加公告'])
      });
    },

    components: {
        quillEditor
    }
  }
</script>

<style>
  
</style>

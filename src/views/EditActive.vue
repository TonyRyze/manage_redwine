<template>
  <div class="rw-editactive" v-loading="loading">
    <el-table
      :data="tableData"
      border
      :default-sort = "{prop: 'date', order: 'descending'}"
      @sort-change = 'sortTableData'
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="titleFirst"
        label="活动标题"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="titleSecond"
        label="活动简介">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑产品"
      class="edit-dialog"
      :visible.sync="dialogVisible"
      size="small">
      <el-form ref="activeEditEleForm" label-width="80px" :rules="rules" :model="this.actives" enctype="multipart/form-data">
        <el-form-item label="活动标题" label-width="100px" prop="titleFirst" required>
          <el-input v-model="titleFirst"></el-input>
        </el-form-item>
        <el-form-item label="活动简介" label-width="100px" prop="titleSecond" required>
          <el-input type="textarea" resize="none" :rows="6" v-model="titleSecond"></el-input>
        </el-form-item>
        <el-form-item label="上传小图" prop="listImg">
          <el-upload
            accept="image/jpeg,image/jpg,image/png"
            class="upload-demo"
            name="avtiveSimage"
            multiple
            ref="activeListIamgeUpload"
            list-type="picture"
            :action="postFileUrl"
            :on-change="smallhandleChange"
            :on-remove="smallhandleChange"
            :on-error="smallhandleError"
            :before-upload="smallhandleBefore"
            :auto-upload="false"
            :file-list="listImg">
            <el-button size="small" type="primary">点击上传小图</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在首页产品小图</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传大图" prop="detailImg">
          <el-upload
            accept="image/jpeg,image/jpg,image/png"
            class="upload-demo"
            name="avtiveBimage"
            multiple
            ref="activeDetailIamgeUpload"
            list-type="picture"
            :action="postFileUrl"
            :on-change="largehandleChange"
            :on-remove="largehandleChange"
            :on-error="largehandleError"
            :before-upload="largehandleBefore"
            :auto-upload="false"
            :file-list="detailImg">
            <el-button size="small" type="primary">点击上传大图</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在首页产品详情图</div>
          </el-upload>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="onSubmits('activeEditEleForm')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import axios from 'axios'
  import cloneDepp from 'clone-deep'
  import { mapMutations, mapState } from 'vuex'
  import Conf from '@/config'

  export default {

    name: 'rwActiveEdit',

    data(){
        return {
          activeUrl: Conf.api.getactives,
          actions: Conf.api.editactives,
          postFileUrl: Conf.api.postfile,
          delActives: Conf.api.deleteactives,
          loading: true,
          dialogVisible: false,
          tableData: [],
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

                  if(tooLarge){
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

                  if(tooLarge){
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
        actives: state => state.editActive.actives,
        breadCrumb: state => state.breadCrumb
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

      sortTableData(state){

        this.tableData.sort((a, b) => {
          if(state.order === 'descending'){
            return new Date(b.date) - new Date(a.date);
          } else if(state.order === 'ascending'){
            return new Date(a.date) - new Date(b.date);
          }
        });

      },

      handleEdit(index, row){
        let obj = Object.assign({}, this.actives, row);
        obj.listImg = [];
        obj.detailImg = [];
        this.$store.commit('EDITACITVEFORM', obj);
        this.dialogVisible = true;
      },

      handleDelete(index, row){
        let _this = this,
              obj = Object.assign({}, this.actives, row);
        this.$confirm('此操作将删除该条产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.loading = true;
          axios({
            method: 'post',
            url: _this.delActives,
            data: {
              id: obj._id
            }
          })
          .then(function(response) {
            _this.loading = false;
            _this.tableData.splice(index, 1);
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
      },

      getActives(){
        const _this = this;
        axios({
          method: 'get',
          url: _this.activeUrl
        })
        .then(function(response) {
          _this.loading = false;
          response.data.map((v, i) => {
            v.date = _this.dateFormat(v.date);
          });
          response.data.sort((a, b) => {
            if(new Date(a.date) > new Date(b.date)){ return -1;}
            if(new Date(a.date) < new Date(b.date)){ return 1;}
            return 0;
          });
          _this.tableData = response.data;
        })
        .catch(function (error) {
          _this.loading = false;
          _this.$message.error('获取数据失败，请刷新重试！');
          console.log(error);
        });
      },

      dateFormat(date){
        var _date = new Date(date),
            y = _date.getFullYear(),
            m = _date.getMonth() + 1,
            d = _date.getDate(),
            h = _date.getHours(),
            sm = _date.getMinutes(),
            ss = _date.getSeconds();

        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        sm = sm < 10 ? '0' + sm : sm;
        ss = ss < 10 ? '0' + ss : ss;
        return y + '-' + m + '-' + d + ' ' + h + ':' + sm + ':' + ss;
      },

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

        this.onFileChange(file, fileList, 'UPDATEACTIVELISTIMAGE');

      },

      smallhandleBefore(file){
        
        // 占空

      },

      smallhandleError(err, file, fileList){
        
        this.$message.error(`${file.name} 文件上传失败，请重新上传`);

      },

      largehandleChange(file, fileList) {

      this.onFileChange(file, fileList, 'UPDATEACTIVEDTAILIMAGE');

      },

      largehandleBefore(file){
      
      // 占空

      },

      largehandleError(err, file, fileList){

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

          this.$refs[formName].validate((valid) => {

            if (valid) {
              this.loading = true;
              axios.post(this.postFileUrl)
              .then(function(response){

                axios({
                  method: 'post',
                  url: _this.actions,
                  data: data
                })
                .then(function(response) {
                  
                  _this.loading = false;
                  _this.dialogVisible = false;

                  if(response.data === 'success'){

                    _this.tableData = _this.tableData.map(function(v, i) {
                      if(v._id == _this.actives._id){
                        v = Object.assign({}, _this.actives);
                      }
                      return v;
                    });

                    _this.$message.success('您已成功编辑一条产品！');

                    _this.$refs.activeListIamgeUpload.submit();
                    _this.$refs.activeDetailIamgeUpload.submit();

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

    beforeMount(){
      
    },

    mounted(){
      this.getActives();
      this.$nextTick(() => {
        this.$store.commit('INITCRUMB', ['活动管理','编辑活动'])
      });
    },

    components: {
        
    }
  }
</script>

<style>
  .edit-dialog .el-form-item{
    margin-bottom: 16px;
  }
  .edit-dialog .el-dialog--small{
    top: 50%!important;
    max-width: 680px;
    min-width: 500px;
    transform: translate3d(-50%, -50%, 0);
  }
</style>

<template>
  <div class="rw-editproduct" v-loading="loading">
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
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="enName"
        label="葡萄酒英文名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="types"
        label="酒类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="country"
        label="国家"
        width="100">
      </el-table-column>
      <el-table-column
        prop="area"
        label="产地">
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
      <el-form ref="editEleForm" label-width="80px" :rules="rules" :model="this.forms" enctype="multipart/form-data">
        <el-form-item label="葡萄酒产国" label-width="110px" prop="country" required>
          <el-input v-model="country" readonly></el-input>
        </el-form-item>
        <el-form-item label="葡萄酒产地" label-width="110px" prop="area" required>
          <el-input v-model="area"></el-input>
        </el-form-item>
        <el-form-item label="葡萄酒名称" label-width="110px" prop="name" required>
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="葡萄酒类型" label-width="110px" prop="types" required>
          <el-input v-model="types"></el-input>
        </el-form-item>
        <el-form-item label="葡萄酒英文名" label-width="110px" prop="enName" required>
          <el-input v-model="enName"></el-input>
        </el-form-item>
        <el-form-item label="葡萄酒介绍" label-width="110px" prop="intros" required>
          <el-input type="textarea" resize="none" :rows="5" v-model="intros"></el-input>
        </el-form-item>
        <el-form-item label="上传小图" prop="smallImage">
          <el-upload
            accept="image/jpeg,image/jpg,image/png"
            class="upload-demo"
            name="simage"
            multiple
            ref="smallImageUpload"
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
        <el-form-item label="上传大图" prop="largerImage">
          <el-upload
            accept="image/jpeg,image/jpg,image/png"
            class="upload-demo"
            name="bimage"
            multiple
            ref="largeImageUpload"
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
        <el-form-item label="上传列表" prop="listImage">
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
            <el-button size="small" type="primary">点击上传列表</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（不需要修改可以忽略），用在产品列表图</div>
          </el-upload>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="onSubmits('editEleForm')">提交</el-button>
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

    name: 'rwEdit',

    data(){
        return {
          productUrl: Conf.api.getwines,
          actions: Conf.api.editwines,
          postFileUrl: Conf.api.postfile,
          delProductUrl: Conf.api.deletewines,
          loading: true,
          dialogVisible: false,
          tableData: [],
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
            largerImage: [
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
                    this.$message.warning('详情图只能上传一张！');
                  } else{
                    callback();
                  }

                },
                trigger: 'blur,change'
              }
            ],
            listImage: [
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
                    this.$message.warning('列表图只能上传一张！');
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
        forms: state => state.editProduct.forms,
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

      name: {
        get() {
          return this.forms.name
        },
        set(value) {
          this.$store.commit('UPDATENAME', value.replace(/\s+/g, ''))
        }
      },

      enName: {
        get() {
          return this.forms.enName
        },
        set(value) {
          this.$store.commit('UPDATEENNAME', value.replace(/\s+/g, ''))
        }
      },

      types: {
        get() {
          return this.forms.types
        },
        set(value) {
          this.$store.commit('UPDATETYPE', value.replace(/\s+/g, ''))
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
        let obj = Object.assign({}, this.forms, row);
        obj.smallImage = [];
        obj.largerImage = [];
        obj.listImage = [];
        this.$store.commit('EDITFORM', obj);
        this.dialogVisible = true;
      },

      handleDelete(index, row){
        let _this = this,
              obj = Object.assign({}, this.forms, row);
        this.$confirm('此操作将删除该条产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.loading = true;
          axios({
            method: 'post',
            url: _this.delProductUrl,
            data: {
              id: obj._id,
              country: obj.country
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

      getProducts(){
        const _this = this;
        axios({
          method: 'get',
          url: _this.productUrl
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

          data.smallImage = Object.assign({}, smallImage[0]);

          let largerImage = data.largerImage.map(v => {
            let imgArr = JSON.parse(v),
                targetObj = {};
            targetObj.name = imgArr.name;
            return targetObj;
          });

          data.largerImage = Object.assign({}, largerImage[0]);

          let listImage = data.listImage.map(v => {
            let imgArr = JSON.parse(v),
                targetObj = {};
            targetObj.name = imgArr.name;
            return targetObj;
          });

          data.listImage = Object.assign({}, listImage[0]);

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
                        if(v._id == _this.forms._id){
                          v = Object.assign({}, _this.forms);
                        }
                        return v;
                      });
                      _this.$message.success('您已成功编辑一条产品！');
                      _this.$refs.smallImageUpload.submit();
                      _this.$refs.largeImageUpload.submit();
                      _this.$refs.listImageUpload.submit();
                      
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
      this.getProducts();
      this.$nextTick(() => {
          this.$store.commit('INITCRUMB', ['产品管理','编辑产品'])
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

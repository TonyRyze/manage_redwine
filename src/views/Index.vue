<template>
  <div class="rw-index" v-loading="loading">
    <h5 class="system-name">佰迈酒业后台管理系统</h5>
    <p class="system-tips" v-if="loginStatus">目前您已是登陆状态，可以对您的网站进行管理！</p>
    <el-form :model="this.loginData" :rules="rules" ref="loginForm" label-width="60px" class="demo-ruleForm" v-if="!loginStatus">
      <el-form-item label="账号" prop="account" class="current-form-item">
        <el-input type="text" v-model="account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" class="current-form-item">
        <el-input type="password" v-model="pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="current-form-item">
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm('loginData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import { mapMutations, mapState } from 'vuex'
  import cloneDepp from 'clone-deep'
  import axios from 'axios'
  import Conf from '@/config'

  export default {

    name: 'rwIndex',

    data() {
      return {
        loading: false,
        actions: Conf.api.login,
        rules: {
          account: [
            { 
              required: true, 
              validator: (rule,value,callback) => {
                if(/^\s*$/g.test(value) == true){
                  callback(new Error("请输入账号"));
                }else{
                  callback();
                }
              },
              trigger: 'blur' 
            }
          ],
          pass: [
            { 
              required: true, 
              validator: (rule,value,callback) => {
                if(/^\s*$/g.test(value) == true){
                  callback(new Error("请输入密码"));
                }else{
                  callback();
                }
              },
              trigger: 'blur' 
            }
          ]
        }
      }
    },

    computed: {

      ...mapState({
        loginData: state => state.login.loginData,
        loginStatus: state => state.login.loginStatus
      }),

      account: {
        get() {
          return cloneDepp(this.loginData.account)
        },
        set(value) {
          this.$store.commit('UPDATAACCOUNT', value)
        }
      },

      pass: {
        get() {
          return cloneDepp(this.loginData.pass)
        },
        set(value) {
          this.$store.commit('UPDATAPASS', value)
        }
      },

    },

    methods: {

      ...mapMutations({
        resetFormData: 'LOGINRESET',
        logined: 'UPDATALOGINSTATUS'
      }),

      submitForm(formName) {
        const _this = this;
        this.loading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = false;
            axios({
              method: 'post',
              url: _this.actions,
              data: _this.loginData,
              timeout: 10000,
            })
            .then(function(response) {

              _this.loading = false;

              if(response.data.code === 1){

                _this.$message.success('登陆成功！');

                _this.resetFormData();

                localStorage.setItem('account', response.data.result);

                _this.logined(true);

              } else{
                _this.$message.warning('账号或者密码错误，请重新输入！');
              }
              
            })
            .catch(function (error) {
              _this.loading = false;
              _this.$message.error('登陆失败！');
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            this.loading = false;
            return false;
          }
        });
      },
      resetForm() {
        this.resetFormData();
      }
    }
  }
</script>

<style scoped>
  .current-form-item{
    width: 50%;
    max-width: 360px;
    min-width: 282px;
    margin-right: auto;
    margin-left: auto;
  }
  .rw-index{
    padding: 150px 0;
  }
  .system-tips{
    font-size: 30px;
    color: #f90;
    font-weight: bold;
    text-align: center;
  }
  .system-name{
    font-size: 60px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 100px;
    color: #666;
  }
  @media screen and (max-width: 1200px) {
    .system-name{
      font-size: 40px;
      margin-bottom: 60px;
    }
  }
</style>

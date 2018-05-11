<template>
  <div class="home-page">
    <el-row :gutter="0" class="full-height box-wrap">
      	<el-col :span="5" class="full-height nav-box" v-if="loginStatus">
              <div class="grid-content content-left">
                <slide-nav></slide-nav>
              </div>
        </el-col>
      	<el-col :span="19" class="active-panel">
            <div class="right-header" v-if="loginStatus">
                <div class="bread-crumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="(item, index) in this.crumbData" :key="index" class="no-jump">{{item}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="login-status">
                    <span class="login">{{account}}</span>
                </div>
            </div>
            <div class="grid-content content-right">
                <Contents></Contents>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>

    import SlideNav from '@/components/SlideNav'
    import Contents from '@/components/Content'
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {

        name: 'home',

        data(){
            return {
                userName: this.account || ''
            }
        },

        mounted(){

        },

        methods: {
            
        },
        
        // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
        // mapState(['crumbData']) 映射 this.crumbData 为 store.state.crumbData
        computed: {
            // 箭头函数可使代码更简练
            // 传字符串参数 'crumbData' 等同于 state => state.crumbData
            ...mapState({

                crumbData: state => state.breadCrumb.crumbData,

                account: state => state.login.loginData.account,

                loginStatus: state => state.login.loginStatus

            })

        },

        components: {
            SlideNav,
            Contents
        }

    }
</script>

<style>
    html *{
		padding: 0;
		margin: 0;
	}
	html, body, #app{
		width: 100%;
		height: 100%;
	}
	.full-height{
		height: 100%;
	}
    .home-page{
        height: 100%;
        overflow: hidden;
    }
    .box-wrap{
        display: flex;
    }
    .active-panel{
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .right-header{
        padding: 0 20px;
        background-color: #eff2f7;
        display: flex;
        height: 60px;
        align-items: center;
        justify-content: space-between;
    }
    .login-status .login{
        color: #999;
        font-size: 14px;
        font-weight: bold;
    }
    .content-left{
		height: 100%;
		background-color: #324157;
	}
    .content-right{
        position: relative;
        flex: 1;
		background-color: #fff;
		margin: 20px;
        overflow: auto;
        overflow-x: hidden;
	}
    .no-jump .el-breadcrumb__item__inner{
        color: #97a8be;
        cursor: text;
    }
    .nav-box{
        max-width: 250px;
        min-width: 206px;
    }
    .el-table__body-wrapper{
        overflow: hidden;
    }
    .loading-box{
        width: 100%;
        height: 100%;
    }
</style>

<template>
  <div class="home-page">
    <el-row :gutter="0" class="full-height box-wrap">
      	<el-col :span="5" class="full-height nav-box">
              <div class="grid-content content-left">
                <slide-nav></slide-nav>
              </div>
        </el-col>
      	<el-col :span="19" class="active-panel">
            <div class="right-header">
                <div class="bread-crumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-for="(item, index) in this.$store.state.breadCrumb.crumbData" :key="index" class="no-jump">{{item}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="login-status">
                    <span class="login" @click="INCREMENT({
                    amount: 12
                })">登录</span>
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
                localCount: 19,
                todos: [1,2,3,4,5,6]
            }
        },

        mounted(){
            
        },

        methods: {
            ...mapMutations([
                'INCREMENT', // 将 `this.INCREMENT()` 映射为 `this.$store.commit('INCREMENT')`
            ])
        },
        
        // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
        // mapState(['count']) 映射 this.count 为 store.state.count
        computed: {
            // 箭头函数可使代码更简练
            // 传字符串参数 'count' 等同于 state => state.count
            ...mapState({

                count: state => state.count,
                
                countAlias: 'count',
              
                countPlusLocalState (state) {
                    return state.count + this.localCount
                }

            }),
            // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
            ...mapGetters([     // 使用对象展开运算符将 getter 混入 computed 对象中
                'doneTodos',
            ]),

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
        font-size: 13px;
    }
    .content-left{
		height: 100%;
		background-color: #324157;
	}
    .content-right{
        flex: 1;
		background-color: #fff;
		padding: 20px;
        overflow: auto;
	}
    .no-jump .el-breadcrumb__item__inner{
        color: #97a8be;
        cursor: text;
    }
    .nav-box{
        max-width: 250px;
        min-width: 206px;
    }
</style>

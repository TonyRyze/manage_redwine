<template>
  <div class="rw-message" v-loading="loading">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
            prop="date"
            label="发布时间"
            width="300">
        </el-table-column>
        <el-table-column
            prop="title"
            label="公告标题"
            width="500">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import axios from 'axios'
  import cloneDepp from 'clone-deep'
  import { mapMutations, mapState } from 'vuex'
  import Conf from '@/config'

  export default {

    name: 'rwNoticeView',

    data(){
        return {
          actions: Conf.api.getnotice,
          delNotice: Conf.api.delnotice,
          loading: false,
          tableData: []
        }
    },

    methods: {
        getNotice(){
            const _this = this;
            axios({
                method: 'get',
                url: _this.actions
            })
            .then(function(response) {
                _this.loading = false;
                response.data.map((v, i) => {
                    v.date = _this.dateFormat(v.date);
                });
                _this.tableData = response.data;
            })
            .catch(function (error) {
                _this.loading = false;
                _this.$message.error('获取数据失败，请刷新重试！');
                console.log(error);
            });
        },

        handleDelete(index, row){
            let _this = this,
                obj = Object.assign({}, this.actives, row);
            this.$confirm('此操作将删除该条公告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                _this.loading = true;
                axios({
                    method: 'post',
                    url: _this.delNotice,
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
    },

    computed: {
      ...mapState({
        breadCrumb: state => state.breadCrumb
      }),
    },

    mounted(){
      this.getNotice();
      this.$nextTick(() => {
        this.$store.commit('INITCRUMB', ['公告管理','编辑公告'])
      });
    },

    components: {
        
    }
  }
</script>

<style>
  
</style>

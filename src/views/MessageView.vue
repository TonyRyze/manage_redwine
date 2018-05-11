<template>
  <div class="rw-message" v-loading="loading">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="contacts"
            label="联系人"
            width="180">
        </el-table-column>
        <el-table-column
            prop="tel"
            label="电话"
            width="180">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱">
        </el-table-column>
        <el-table-column
            prop="comments"
            label="留言">
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

    name: 'rwMessageView',

    data(){
        return {
          actions: Conf.api.getmessage,
          loading: true,
          tableData: []
        }
    },

    methods: {
        getMessage(){
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
      this.getMessage();
      this.$nextTick(() => {
        this.$store.commit('INITCRUMB', ['留言板'])
      });
    },

    components: {
        
    }
  }
</script>

<style>
  
</style>

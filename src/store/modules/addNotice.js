// 添加公告模块
import Vue from 'vue'
import * as types from '../mutations'

const state = {
    notice: {
        title: '',
        content: ''
    }
}


// mutations
const mutations = {

    [types.UPDATENOTICETITLE] (state, payload) {
        
        Vue.set(state.notice, 'title', payload);
    
    },


    [types.UPDATENOTICECONTENT] (state, payload) {
        
        Vue.set(state.notice, 'content', payload);
    
    },

    [types.EMPTYNOTICE] (state, payload) {
        
        Vue.set(state.notice, 'title', "");

        Vue.set(state.notice, 'content', "");
    
    },

}

export default {
    state,
    mutations
}
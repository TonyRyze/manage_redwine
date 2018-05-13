// 添加活动模块
import Vue from 'vue'
import * as types from '../mutations'

const state = {
    recruitment: {
        name: '',
        zhize: '',
        zige: ''
    }
}


// mutations
const mutations = {
    

    [types.UPDATERECRUITMENTNAME] (state, payload) {
        
        Vue.set(state.recruitment, 'name', payload);
    
    },


    [types.UPDATERECRUITMENTZHIZE] (state, payload) {
        
        Vue.set(state.recruitment, 'zhize', payload);
    
    },

    [types.UPDATERECRUITMENTZIGE] (state, payload) {
        
        Vue.set(state.recruitment, 'zige', payload);
    
    },

    [types.EMPTYRECRUITMENT] (state) {
        
        Vue.set(state.recruitment, 'name', '');

        Vue.set(state.recruitment, 'zhize', '');

        Vue.set(state.recruitment, 'zige', '');
    
    }

}

export default {
    state,
    mutations
}
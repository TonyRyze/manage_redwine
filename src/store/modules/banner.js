// 添加产品模块
import Vue from 'vue'
import * as types from '../mutations'

const state = {
    banner: {
        bannerImage: []
    }
}


// mutations
const mutations = {
    

    [types.UPDATEBANNERIMAGE] (state, payload) {
        
        Vue.set(state.banner, 'bannerImage', payload.fileList);
    
    },

    [types.EMPTYBANNER] (state) {
        
        Vue.set(state.banner, 'bannerImage', []);
    
    }

}

export default {
    state,
    mutations
}
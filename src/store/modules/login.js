// 添加活动模块
import Vue from 'vue'
import * as types from '../mutations'

const state = {
    loginStatus: (localStorage.account && localStorage.account.length) ? true : false,
    loginData: {
        account: localStorage.account || '',
        pass: ''
    }
}


// mutations
const mutations = {
    

    [types.UPDATAACCOUNT] (state, payload) {
        
        Vue.set(state.loginData, 'account', payload);
    
    },

    [types.UPDATAPASS] (state, payload) {
        
        Vue.set(state.loginData, 'pass', payload);
    
    },

    [types.UPDATALOGINSTATUS] (state, payload) {
        
        state.loginStatus = payload;
    
    },

    [types.LOGINRESET] (state) {

        Vue.set(state.loginData, 'pass', '');
    
    }

}

export default {
    state,
    mutations
}
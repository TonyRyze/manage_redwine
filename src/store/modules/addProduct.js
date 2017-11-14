// 添加产品模块
import Vue from 'vue'
import * as types from '../mutations'

const state = {
    forms: {
        area: '',
        name: '',
        types: '',
        enName: '',
        country: '',
        intros: '',
        smallImage: [],
        largerImage: [],
        listImage: []
    }
}


// mutations
const mutations = {
    

    [types.UPDATESMALLIMAGE] (state, payload) {
        
        Vue.set(state.forms, 'smallImage', payload.fileList);
    
    },


    [types.UPDATELARGERIMAGE] (state, payload) {
        
        Vue.set(state.forms, 'largerImage', payload.fileList);
    
    },

    [types.UPDATELISTIMAGE] (state, payload) {
        
        Vue.set(state.forms, 'listImage', payload.fileList);
    
    },

    [types.UPDATENAME] (state, payload) {
        
        Vue.set(state.forms, 'name', payload);
    
    },

    [types.UPDATEENNAME] (state, payload) {
        
        Vue.set(state.forms, 'enName', payload);
    
    },

    [types.UPDATECOUNTRY] (state, payload) {
        
        Vue.set(state.forms, 'country', payload);
    
    },

    [types.UPDATEAREA] (state, payload) {
        
        Vue.set(state.forms, 'area', payload);
    
    },

    [types.UPDATEINTROS] (state, payload) {
        
        Vue.set(state.forms, 'intros', payload);
    
    },

    [types.UPDATETYPE] (state, payload) {
        
        Vue.set(state.forms, 'types', payload);
    
    },

    [types.EMPTYFORM] (state) {
        
        Vue.set(state.forms, 'smallImage', []);

        Vue.set(state.forms, 'largerImage', []);

        Vue.set(state.forms, 'listImage', []);

        Vue.set(state.forms, 'country', '');

        Vue.set(state.forms, 'area', '');

         Vue.set(state.forms, 'types', '');

        Vue.set(state.forms, 'name', '');

        Vue.set(state.forms, 'enName', '');

        Vue.set(state.forms, 'intros', '');
    
    }

}

export default {
    state,
    mutations
}
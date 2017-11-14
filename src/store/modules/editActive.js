// 添加产品模块
import Vue from 'vue'
import * as types from '../mutations'

const state = {
    actives: {
        titleFirst: '',
        titleSecond: '',
        listImg: [],
        detailImg: []
    }
}


// mutations
const mutations = {
    

    [types.UPDATEACTIVELISTIMAGE] (state, payload) {
        
        Vue.set(state.actives, 'listImg', payload.fileList);
    
    },


    [types.UPDATEACTIVEDTAILIMAGE] (state, payload) {
        
        Vue.set(state.actives, 'detailImg', payload.fileList);
    
    },


    [types.UPDATEACTIVETITLEFIRST] (state, payload) {
        
        Vue.set(state.actives, 'titleFirst', payload);
    
    },

    [types.UPDATEACTIVETITLESECOND] (state, payload) {
        
        Vue.set(state.actives, 'titleSecond', payload);
    
    },

    [types.EMPTYACTIVE] (state) {
        
        Vue.set(state.actives, 'titleFirst', '');

        Vue.set(state.actives, 'titleSecond', '');

        Vue.set(state.actives, 'listImg', []);

        Vue.set(state.actives, 'detailImg', []);
    
    },

    [types.EDITACITVEFORM] (state, payload) {

        state.actives = Object.assign({}, state.actives, payload);
    
    }

}

export default {
    state,
    mutations
}
// 面包屑
import Vue from 'vue'
import * as types from '../mutations'

const state = {
    crumbData: []
}


// mutations
const mutations = {

    [types.CRUMBCHANGE] (state, key) {

        const crumbObj = {
            '1': [''],
            '2-1': ['产品管理','添加产品'],
            '2-2': ['产品管理','编辑产品'],
            '3-1': ['首页轮播','添加banner图'],
            '3-2': ['首页轮播','编辑banner图'],
            '4-1': ['活动管理','添加活动'],
            '4-2': ['活动管理','编辑活动'],
            '5'  : ['留言板'],
            '6-1': ['公告管理','添加公告'],
            '6-2': ['公告管理','编辑公告'],
            '7-1': ['招聘管理','添加职位'],
            '7-2': ['招聘管理','编辑职位'],
            
        }

        state.crumbData = crumbObj[key]

    },
    
    [types.INITCRUMB] (state, payload) {

        state.crumbData = Object.assign([], state.crumbData, payload)

    }

}

export default {
    state,
    mutations
}
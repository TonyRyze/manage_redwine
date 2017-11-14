// 添加产品模块
import * as types from '../mutations'

const state = {
    crumbData: []
}


// mutations
const mutations = {

    [types.CRUMBCHANGE] (state, key) {

        const crumbObj = {
            '1': [],
            '2-1': ['产品管理','添加产品'],
            '2-2': ['产品管理','编辑产品'],
            '3-1': ['首页轮播','添加banner图'],
            '3-2': ['首页轮播','编辑banner图'],
            '4-1': ['活动管理','添加活动'],
            '4-2': ['活动管理','编辑活动'],
            '5-1': ['公告管理','添加公告'],
            '5-2': ['公告管理','编辑公告'],
            '6-1': ['招聘管理','添加职位'],
            '6-2': ['招聘管理','编辑职位'],
            '7': ['公司简介'],
        }

        state.crumbData = crumbObj[key]

    }

}

export default {
    state,
    mutations
}
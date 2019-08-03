import Vue from 'vue';
import Vuex from 'vuex'
import addTest from './modules/addTest'
import Author from './modules/author'
import User from './modules/user'
Vue.use(Vuex);

const store = new Vuex.Store({
    // 初始化数据
    state: {

    },
    // 同步
    mutations: {

    },
    // 异步
    actions: {

    },
    // 计算属性
    getters: {

    },
    // 模块
    modules: {
        addTest,
        User,
        Author
    }
})
export default store;

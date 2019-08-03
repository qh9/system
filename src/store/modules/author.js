// import Axios from '@utils/axiosT';

export default {
    // 初始化数据
    state: {
        authors: []
    },
    // 同步
    mutations: {
    },
    // 异步
    actions: {
        saveAuthor ({commit}, data) {
            commit('authors', data)
            console.log(data)
        }
    },
    // 计算属性
    getters: {

    },
    // 模块
    modules: {

    }
}


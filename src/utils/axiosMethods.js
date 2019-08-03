import axios from './axiosT';

export default {
    get: (url, params = {}) => {
        return new Promise((resolve) => {
            axios.get(url, {
                params
            }).then(res => resolve(res))
        })
    },
    post: (url, params) => {
        return new Promise((resolve) => {
            axios.post(url, params).then(res => resolve(res))
        })
    },
    delete: (url, params = {}) => {
        return new Promise((resolve) => {
            axios.delete(url, {
                data: params
            }).then(res => resolve(res))
        })
    },
    put: (url, params) => {
        return new Promise((resolve) => {
            axios.put(url, params).then(res => resolve(res))
        })
    }
}



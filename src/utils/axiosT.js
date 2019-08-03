import axios from 'axios'
import cookie from 'js-cookie'
import router from '@/router';
// import errCode from '@/config/errCode'
import {Notification} from 'element-ui'

axios.defaults.timeout = 5000

axios.interceptors.request.use((config) => {
    // console.log(config)
    let token = cookie.get('token')
    if (config.url !== '/user/login') {
        if (!token) {
            router.push('/')
        }
        config.headers = {
            Authorization: token
        }
    }
    return config
})

axios.interceptors.response.use(response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    if (response.status === 404) {
        router.push('/error')
    }
    return response
}, (err) => {
    Notification.error({
        title: '错误',
        message: err
        // errCode[response.status]
    })
    return Promise.reject(err)
})


export default axios;

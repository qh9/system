import Axios from '@/utils/axiosMethods';
import mainRouters from '@/router/main'
import {filterAuthor} from '@/utils/filterAuthor'
import Router from '@/router/index'
export default {
    state: {
        authorMsg: ''
    },
    mutations: {
        saveUserInfo (state, msg) {
            state.authorMsg = msg
        }
    },
    actions: {
        getUserInfo ({commit, dispatch}) {
            Axios.get('/api/user/userInfo').then(res => {
                let authorMsg = res.data.data.identity_text
                commit('saveUserInfo', authorMsg)
                let routers = filterAuthor(mainRouters, authorMsg)
                dispatch('Author/saveAuthor', routers, {root: true})
                Router.addRoutes(routers)
                Router.push('/main')
            })
        }
    }
}

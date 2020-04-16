import * as mutationType  from './mutationType'

export default {
    [mutationType.SET_AUTHENTICATED](state, data) {
        //设置用户权限
        if (data) {
            state.authenticated = data
        } else {
            state.authenticated = false
        }
    },
    [mutationType.USER](state, data) {
        //设置用户信息
        if (data) {
            state.user = data
        } else {
            state.user = {}
        }
    },
}
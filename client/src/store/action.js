import * as mutationType from './mutationType'

export default {
    setAuthenticated({ commit }, data) {
        //设置用户权限
        commit(mutationType.SET_AUTHENTICATED, data)
    },
    user({ commit }, data) {
        //保存用户信息
        commit(mutationType.USER, data)
    },
    exit({ commit }) {
        //用户退出
        commit(mutationType.SET_AUTHENTICATED, false)
        commit(mutationType.USER, null)
    },
}
export default {
    authenticated(state) {
        //返回用户权限
        return state.authenticated
    },
    user(state) {
        //返回用户信息
        return state.user
    }
}
import myAxios from './axios'

//用户注册
export const register = (obj) => myAxios('users/register', obj, 'Post')

//用户登录
export const login = (obj) => myAxios('users/login', obj, 'Post')

//我的信息
export const me = (obj) => myAxios('users/me', obj, 'Get')
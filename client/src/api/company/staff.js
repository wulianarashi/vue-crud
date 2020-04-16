import myAxios from '../axios'

//员工列表
export const list = (obj) => myAxios('staff/list', obj, 'Post')

//员工添加
export const add = (obj) => myAxios('staff/add', obj, 'Post')

//员工编辑
export const edit = (id, obj) => myAxios('staff/edit/' + id, obj, 'Post')

//员工删除
export const del = (id, obj) => myAxios('staff/del/' + id, obj, 'Post')



import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router'

axios.defaults.baseURL='/api/'

//请求loading效果
let loading

//请求开始
function startLoading() {
    loading = Loading.service({
        lock:true,
        text:"加载中。。。。。",
        background:'rgba(255, 255, 255, 1)'
    })
}

//请求结束
function endLoading() {
    loading.close()
}

//请求拦截操作
axios.interceptors.request.use( config => {
    startLoading()
    //判断用户是否有登录
    if (window.localStorage.wulianarashi) {
        config.headers.Authorization = window.localStorage.wulianarashi
    }

    return config
}, err => {
    return Promise.reject(err)
})


axios.interceptors.response.use(response => {
    endLoading() 
    return response
}, err => {
    //当用户token过期
    endLoading()
    Message.error(err.response.data)
    const {status} = err.response

    if (status === 401) {
        Message.error('请重新登录')
        localStorage.removeItem('wulianarashi')
        router.replace('/login')
    }

    return Promise.reject(err)
})


//请求的封装
export default function myAxios (url = '', data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        let promise 
        if (type === 'GET') {
            let dataStr = ''

            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })

            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }

            promise = axios.get(url)
        } else {
            promise = axios.post(url, data)
        }

        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            Message.error(error.messgae)
        })
    })
}
 
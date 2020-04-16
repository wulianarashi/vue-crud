const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    publicPath:'/',//根域上下文目录
    outputDir:'dist',//构建输出目录
    assetsDir:'assets',//静态资源目录 (js,css,img,fonts)
    lintOnSave:false,//是否开启eslint保存检测 有效值：true | false | 'error
    runtimeCompiler:true,//运行时版本是否需要编译
    transpileDependencies:[],//默认babel-loader忽略mode_modules,这里可增加例外的依赖包名
    productionSourceMap:true,//是否在构建生产包时生成 sourceMap 文件, false将提高构建速度
    configureWebpack: config=>{
        //webpack 配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) {
            //开发环境配置
            config.devtool = 'cheap-module-eval-suorce-map'
        }else{
            //生产环境
        }
        // Object.assign(config,{
        //     resolve:{
        //         alias:{
        //             '@':path.resolve(__dirname, './src'),
        //             '@c':path.resolve(__dirname,'./src/components'),
        //             'vue$':'vue/dist/vue.esm.js'
        //         }
        //     }
        // })
    },
    chainWebpack: config =>{
        if (debug) {
            //开发环境卑职
        } else {
            //生产环境卑职
        }
    } ,
    parallel:require('os').cpus().length>1, //构建时开启多进程处理babel编译
    pluginOptions:{
        //第三方插件配置
    },
    pwa:{
        //单页插件相关配置

    },
    devServer:{
        open:true,
        host:'localhost',
        port:8080,
        https:false,
        hotOnly:false,
        proxy:{
            //跨域配置
            '/api':{
                target:'http://localhost:3000/api/',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        },
        before: app => {}
    }
}
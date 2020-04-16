<template>
    <div class="header">
        <div class="header-box">
            <div class="header-box-left">{{user.company || '测试名'}}</div>
            <div class="header-box-right">
                <el-dropdown @command='command'>
                    <span class="el-dropdown-link t-p">
                        {{user.name || '测试名'}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='login'>登录</el-dropdown-item>
                        <el-dropdown-item command='register'>注册</el-dropdown-item>
                        <el-dropdown-item command='exit'>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { messageBox } from '@/utils/message.js'
export default {
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        command(item) {
            this[item]()
        },
        login() {
            this.$router.push('/login')
        },
        register() {
            this.$router.push('/register')
        },
        exit() {
            messageBox('你确定要退出吗?').then( () => {
                localStorage.removeItem('wulianarashi')
                this.$store.dispatch('exit')
                this.$router.push('/login')
            }).catch( () => {})
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/header.styl'
.el-dropdown-link
    cursor pointer
</style>
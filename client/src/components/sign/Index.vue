<template>
    <div class="info">
        <div class="info-box">
            <img src="@/assets/imgs/wulianarashi.png" alt="" class="info-img">
            <router-link :to='path' class="go-back" tag='span'>{{name}}</router-link>
        </div>
        <div class="info-card">
            <h3 class="my-title">{{title}}</h3>
            <slot></slot>
        </div>
        <img src="@/assets/imgs/bg.jpg" alt="" class="bg">
    </div>
</template>

<script>

export default {
    props: {
        path: {
            type: String,
            default:''
        },
        name: {
            type: String,
            default:''
        },
        title: {
            type: String,
            default:''
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/login.styl'
</style>
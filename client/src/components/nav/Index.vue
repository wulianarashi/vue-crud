<template>
    <div class="nav">
        <router-link v-for="item in nav" :key=item.id :to=item.url class="nav-item" active-class='on'>{{item.name}}</router-link>
    </div>
</template>

<script>
import nav from '@/utils/nav.js'
export default {
    data() {    
        return {
            nav
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/company/nav.styl'
</style>
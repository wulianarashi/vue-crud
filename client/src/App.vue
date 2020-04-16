<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode"
import { isEmpty } from '@/utils/fn.js'
export default {
  created() {
    //判断用户在缓存中是否存在
    if (localStorage.wulianarashi) {
      const decode = jwt_decode(window.localStorage.wulianarashi);
      this.$store.dispatch("setAuthenticated", !isEmpty(decode));
      this.$store.dispatch("user", decode);
    }else {
      sessionStorage.removeItem('vuex')
    }
  },
}
</script>

<style lang="stylus">
#app {
  height: 100%;
}
</style>
<template>
  <div class="home">
      <MyHeader />
      <div class="main">
        <MyNav/>
        <div class='main-body'>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
        </div>
      </div>
  </div>
</template>

<script>
import MyHeader from '@/components/header/Index.vue'
import MyNav from '@/components/nav/Index.vue'
export default {
  components: {
    MyHeader,
    MyNav
  }
}
</script>

<style>
.home{
  height: 100%;
}
.main{
  padding-top: 60px;
  height: calc(100% - 60px);
}
.main-body{
  box-sizing: border-box;
  margin-left: 180px;
  padding: 20px;
  height: 100%;
  background: #f4f5f9;
  min-width: 1000px;
}
</style>
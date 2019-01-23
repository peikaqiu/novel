<template>
  <div id="app">
    <div class="loding" v-if="isAjax">Loding</div>
    <div class="container" v-else>
      <HomeView></HomeView>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import HomeView from "./views/Home/HomeView"
  import {mapState} from 'vuex'
  export default{
      components:{
        HomeView
      },
    computed:mapState(['isAjax'])
  }
</script>

<style lang="scss">
  .loding{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
    line-height: 40px;
    background: #f2f2f2;
  }
</style>

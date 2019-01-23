<template>
  <div class="loveBook">
    <div class="header">
      <div class="header_container">
        <span class="iconfont icon-arrow-left-copy" @click="back"></span>
        <span class="name">我的收藏</span>
        <span class="iconfont icon-sousuo" @click="search"></span>
        <span class="iconfont icon-caidan"></span>
      </div>
    </div>
    <div class="book" v-for="(item,index) in book" :key="index">
      <img :src="item.cover | getImgUrl">
      <span class="closeLove" @click="closeLove(index)">取消收藏</span>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import {getimg} from '../../assets/js/getImg'
  export default{
    computed: {
      ...mapState({
        book: state => state.data.setBook
      })
    },
    methods: {
      ...mapMutations(['DEL_LOVE_BOOK','GET_SET_BOOK']),
      back(){
        this.$router.back()
      },
      search(){
        this.$router.push({path: '/SearchView'})
      },
      closeLove(ind){
        this.DEL_LOVE_BOOK(ind)
        this.GET_SET_BOOK()
      }
    },
    filters: {
      getImgUrl(val){
        return getimg(val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loveBook {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: #fff;
    .header {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      background: #e1e0df;
      .header_container {
        display: flex;
        .icon-arrow-left-copy,
        .icon-sousuo {
          flex: 0 0 30px;
          font-size: 20px;
        }
        .name {
          text-align: center;
          flex: 1;
          margin-top: 5px;
        }
        .icon-caidan {
          font-size: 20px;
        }
      }
    }
    .book{
      display: inline-block;
      margin-left: 18px;
      box-sizing: border-box;
      padding: 10px 0;
      img{
        width: 80px;
        height: 120px;
      }
      .closeLove{
        display: block;
        text-align: center;
        border: 1px solid red;
        border-radius: 5px;
      }
    }
  }
</style>

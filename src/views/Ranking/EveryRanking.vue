<template>
    <div class="everyRanking">
      <div class="header">
        <div class="header_container">
          <span class="iconfont icon-arrow-left-copy" @click="back"></span>
          <span class="name">{{getRankingTotal.shortTitle}}</span>
          <span class="iconfont icon-sousuo" @click="search"></span>
          <span class="iconfont icon-caidan"></span>
        </div>
      </div>
      <div class="item_box" v-for="(item,index) in getRankingTotal.books" :key="index"
           @click="sentId({id:item._id,author:item.author,book:item._id})">
        <div class="pic">
          <img :src="item.cover | getImgUrl">
        </div>
        <div class="msg">
          <div class="name">{{item.title}}</div>
          <div class="introduce">{{item.shortIntro}}</div>
          <div class="footer">
            <div class="left">
              <span class="iconfont icon-people"></span>
              <span class="author">{{item.author}}</span>
            </div>
            <div class="right">
              <div class="cat"><span>{{item.majorCate}}</span></div>
              <div class="wordCount"><span>{{item.minorCate}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import {getimg} from '../../assets/js/getImg'
    export default{
      computed:{
        ...mapGetters(['getRankingTotal'])
      },
      filters: {
        getImgUrl(val){
          return getimg(val)
        }
      },
      methods:{
        ...mapActions(['getInformation']),
        sentId({id,author,book}){
          this.getInformation({axios:this.axios, id:id , author:author, book:book})
          this.$router.push({path:'/Information'})
        },
        back(){
          this.$router.back()
        },
        search(){
          this.$router.push({path: '/SearchView'})
        }
      }
    }
</script>

<style lang="scss" scoped>
  .everyRanking{
    position: absolute;
    background: #fff;
    .header {
      width: 100%;
      padding: 10px 15px 10px 15px;
      box-sizing: border-box;
      background: #fff;
      .header_container {
        display: flex;
        .icon-arrow-left-copy,
        .icon-sousuo {
          flex: 0 0 30px;
          font-size: 20px;
        }
        .name{
          flex: 1;
          margin-top: 2px;
        }
        .icon-caidan {
          font-size: 20px;
        }
      }
    }
    .item_box{
      display: flex;
      box-sizing: border-box;
      padding: 10px 15px;
      .pic{
        flex:  0 0 100px;
        img{
          width: 80px;
          height: 100px;
        }
      }
      .msg{
        flex: 1;
        .name{
          height: 20px;
          line-height: 20px;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .introduce{
          height: 40px;
          line-height: 20px;
          overflow: hidden;
          text-overflow:ellipsis;
          color: #aeb2b8;
        }
        .footer{
          display: flex;
          .left{
            flex: 1;
            .icon-people{
              color:skyblue;
              margin-right: 10px;
            }
            .author{
              color: #c3c6cb;
            }
          }
          .right{
            .cat,
            .wordCount{
              display: inline-block;
              span{
                box-sizing: border-box;
                padding: 1px 2px;
                border: 1px solid skyblue;
                font-size: 10px;
                color: #c10000;
              }
            }
            .cat{
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
</style>

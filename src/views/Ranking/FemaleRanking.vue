<template>
  <div class="ranking" ref="rankingLoop">
    <div class="rankingContent">
      <div class="header">
        <div class="header_container">
          <span class="iconfont icon-arrow-left-copy" @click="back"></span>
          <span class="name">分类</span>
          <div class="sex">
            <div class="male"><span @click="setTomale">男生</span></div>
            <div class="female"><span class=active>女生</span></div>
          </div>
          <span class="iconfont icon-sousuo" @click="search"></span>
          <span class="iconfont icon-caidan"></span>
        </div>
      </div>
      <div class="title" v-for="(item,index) in getRankings.female">
        <span class="shortTitle" @click="sendBookId(index)">{{item.shortTitle}}</span>
        <div class="ziranking" v-for="(items,index) in getZiRankings[index].books" :key="index" v-if="index<5"
             @click="sentId({id:items._id,author:items.author,book:items._id})">
          <span class="bookName">{{items.title}}</span>
          <span class="iconfont icon-arrow-right"></span>
        </div>
        <split></split>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations,mapState} from 'vuex'
  import Split from "../../components/widget/Spilt";
  import BScroll from 'better-scroll'
  export default{
    components: {Split},
    computed: {
      ...mapGetters(['getRankings', 'getZiRankings']),
      ...mapState({
        idNum : state => state.data.idNum
      })
    },
    methods: {
      ...mapMutations(['GET_RANKING_ID']),
      ...mapActions(['getInformation','getRanking','getZiRanking']),
      back(){
        this.$router.push({path: '/'})
      },
      search(){
        this.$router.push({path: '/SearchView'})
      },
      setTomale(){
        this.$router.push({path: '/ManRanking'})
        this.getRanking({axios:this.axios})
          .then(() => {
            this.getZiRanking({axios:this.axios, rank:this.idNum})
          })
      },
      sentId({id, author, book}){
        this.getInformation({axios: this.axios, id: id, author: author, book: book})
        this.$router.push({path: '/Information'})
      },
      sendBookId(index){
        this.GET_RANKING_ID(index)
        this.$router.push({path: '/EveryRanking'})
      }
    },
    created(){
      this.$nextTick(() => {
        if (!this.rankingScroll) {
          this.rankingScroll = new BScroll(this.$refs.rankingLoop, {
            click: true
          })
        } else {
          this.rankingScroll.refresh()
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .ranking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 40px;
    background: #fff;
    .header {
      width: 100%;
      padding: 10px 15px 10px 15px;
      box-sizing: border-box;
      background: #fff;
      border-bottom: 1px solid #ccc;
      .header_container {
        display: flex;
        .icon-arrow-left-copy,
        .icon-sousuo {
          flex: 0 0 30px;
          font-size: 20px;
        }
        .sex {
          flex: 1;
          text-align: center;
          .name {
            flex: 0 0 30px;
          }
          .male {
            display: inline-block;
            margin-right: 5px;
            .active {
              background: #ed424b;
              color: #fff;
            }
            span {
              box-sizing: border-box;
              padding: 5px 30px;
              background: #fff;
              border-radius: 5px;
              border: 1px solid red;
            }
          }
        }
        .female {
          display: inline-block;
          margin-left: 5px;
          .active {
            background: #ed424b;
            color: #fff;
          }
          span {
            box-sizing: border-box;
            padding: 5px 30px;
            background: #fff;
            border-radius: 5px;
            border: 1px solid red;
          }
        }
        .icon-caidan {
          font-size: 20px;
        }
      }
    }
    .title {
      .shortTitle {
        font-size: 20px;
        box-sizing: border-box;
        border-left: 2px solid red;
        padding: 0 0 0 10px;
        display: block;
        width: 100%;
      }
      .ziranking {
        box-sizing: border-box;
        padding: 0 0 0 20px;
        display: flex;
        .bookName {
          flex: 1;
        }
        .icon-arrow-right {
          flex: 0 0 30px;
        }
      }
    }
  }
</style>

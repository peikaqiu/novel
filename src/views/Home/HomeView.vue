<template>
  <div>
    <div class="novel" ref="novelLoop">
      <div class="container_box">
        <div class="header">
          <div class="header_title">
            <span class="name">小说网</span>
            <span class="person"><i class="iconfont icon-people"></i></span>
            <span class="book" @click="loveBook"><i class="iconfont icon-shuji"></i></span>
          </div>
          <mu-carousel>
            <mu-carousel-item>
              <img src="../../../public/images/banner01.jpg" width="100%">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../../../public/images/banner02.jpg" width="100%">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../../../public/images/banner03.jpg" width="100%">
            </mu-carousel-item>
            <mu-carousel-item>
              <img src="../../../public/images/banner04.jpg" width="100%">
            </mu-carousel-item>
          </mu-carousel>
          <router-link to="/SearchView">
            <div class="inp">
              <input type="text">
              <div class="search_text">
                <i class="iconfont icon-sousuo"></i>
                <span>搜索</span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="list">
          <div class="item" @click="classify">
            <span class="icon"><i class="iconfont icon-leimupinleifenleileibie"></i></span>
            <span class="list_title">分类</span>
          </div>
          <div class="item" @click="ranking">
            <span class="icon"><i class="iconfont icon-paihangbang"></i></span>
            <span class="list_title">排行榜</span>
          </div>
          <div class="item">
            <span class="icon"><i class="iconfont icon-mianfeibang"></i></span>
            <span class="list_title">免费</span>
          </div>
          <div class="item">
            <span class="icon"><i class="iconfont icon-xiaoshuowanben"></i></span>
            <span class="list_title">完本</span>
          </div>
          <div class="item">
            <span><i class="iconfont icon-dashenbang"></i></span>
            <span class="list_title">大神</span>
          </div>
        </div>
        <div class="recommend">
          <div class="title">精品推荐</div>
          <div class="loding" v-show="isLoding">加载中</div>
          <div class="recommend_container">
            <router-link to="/Information">
              <div class="recommend_contain" v-for="(item,index) in getHotRanks" :key="index"
                   @click="sendId({id:item._id,author:item.author,book:item._id})">
                <img :src="item.cover | getImgUrl">
                <span class="name">{{item.title}}</span>
                <span class="author">{{item.author}}</span>
              </div>
            </router-link>
          </div>
          <div class="change" @click="changeBook">换一换</div>
        </div>
        <split></split>
        <div class="member">
          <div class="title">VIP排行榜</div>
          <div class="member_container" ref="vipLoop">
            <div class="setloop">
              <div class="member_contain" v-for="(item,index) in getVipBooks" :key="index"
                   @click="sendVid({id:item._id,author:item.author})">
                <img :src="item.cover | getImgUrl">
                <span class="name">{{item.title}}</span>
                <span class="author">{{item.author}}</span>
              </div>
            </div>
          </div>
          <div class="change" @click="changeVip">换一换</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import {GET_HOT_RANK} from '../../store/mutation-types'
  import {getimg} from '../../assets/js/getImg'
  import BScroll from 'better-scroll'
  import Split from "../../components/widget/Spilt";
  export default{
    components: {Split},
    computed: {
      ...mapGetters(['getHotRanks', 'getVipBooks']),
      ...mapState({
        isLoding:state => state.isLoding,
        idNum:state => state.data.idNum
      })
    },
    filters: {
      getImgUrl(val){
        return getimg(val)
      }
    },
    created(){
      this.$nextTick(() => {
        if (!this.novelScroll) {
          this.novelScroll = new BScroll(this.$refs.novelLoop, {
            click: true
          })
        } else {
          this.novelScrool.refresh()
        }

        if (!this.vipScroll) {
          this.vipScroll = new BScroll(this.$refs.vipLoop, {
            click: true,
            scrollX: true
          })
        } else {
          this.vipScroll.refresh()
        }
      })
    },
    methods: {
      ...mapActions(['getInformation', 'getHotRank', 'getVip', 'getClassify','getRanking','getZiRanking']),
      sendId({id, author, book}){
        this.getInformation({axios: this.axios, id: id, author: author, book: book})
      },
      changeBook(){
        this.getHotRank({axios: this.axios})
      },
      changeVip(){
        this.vipScroll.refresh()
        this.getVip({axios: this.axios})
      },
      sendVid({id, author}){
        this.$router.push({path: '/Information'})
        this.getInformation({axios: this.axios, id: id, author: author})
      },
      classify(){
        this.$router.push({path: '/FuClassify'})
        this.getClassify({axios: this.axios})
      },
      ranking(){
        this.$router.push({path: '/ManRanking'})
        this.getZiRanking({axios:this.axios, rank:this.idNum})
      },
      loveBook(){
          this.$router.push({path:'/LoveBookView'})
      }
    }

  }
</script>

<style lang="scss" scoped>
  .novel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f2f2f2;
    .container_box {
      .header {
        width: 100%;
        background: #f6f7f9;
        box-sizing: border-box;
        padding: 0 15px 10px 15px;
        .header_title {
          display: flex;
          height: 50px;
          line-height: 50px;
          align-items: center;
          .name {
            font-size: 20px;
            flex: 1;
          }
          .person {
            flex: 0 0 30px;
            .icon-people {
              font-size: 18px;
              color: red;
            }

          }
          .book {
            flex: 0 0 30px;
            .icon-shuji {
              font-size: 22px;
              color: red;
            }
          }
        }
        .mu-carousel {
          width: 100%;
          max-height: 150px;
        }
        .inp {
          border: 1px solid #f2f2f2;
          border-radius: 5px;
          box-sizing: border-box;
          height: 35px;
          line-height: 35px;
          position: relative;
          input {
            box-sizing: border-box;
            border-radius: 5px;
            width: 100%;
            height: 100%;
            outline: 0;
            border: 0;
            padding: 0 0 0 10px;
          }
          .search_text {
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -30px;
            .icon-tubiao- {
              font-size: 25px;
              vertical-align: middle;
              color: #828284;
            }
            span {
              margin-left: 5px;
              letter-spacing: 2px;
              color: #828284;
            }
          }
        }
      }
      .list {
        display: flex;
        text-align: center;
        background: #fff;
        .item {
          flex: 1;
          span {
            display: block;
          }
          .icon-leimupinleifenleileibie,
          .icon-paihangbang,
          .icon-mianfeibang,
          .icon-xiaoshuowanben,
          .icon-dashenbang {
            font-size: 25px;
          }
          .icon-leimupinleifenleileibie {
            color: #78b7ff;
          }
          .icon-paihangbang {
            color: #ff737a;
          }
          .icon-mianfeibang {
            color: #ffa978;
          }
          .icon-xiaoshuowanben {
            color: #ffd95e;
          }
          .icon-dashenbang {
            color: #c671ff;
          }
          .list_title {
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
      .recommend {
        box-sizing: border-box;
        padding: 20px 0 0 0;
        background: #fff;
        position: relative;
        .title {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          box-sizing: border-box;
          padding: 0 20px;
          border-left: 2px solid red;
        }
        .loding {
          position: absolute;
          top: 20px;
          left: 0;
          width: 100%;
          height: 362px;
          background: #fff;
          text-align: center;
          line-height: 362px;
        }
        .recommend_container {
          width: 100%;
          box-sizing: border-box;
          padding: 20px 20px;
          &:after, &:before {
            content: "";
            display: block;
            clear: both;
          }
          .recommend_contain {
            float: left;
            margin: 0 0 10px 11px;
            img {
              width: 85px;
              height: 110px;
            }
            .name {
              display: block;
              width: 80px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 10px;
              color: #333333;
            }
            .author {
              display: block;
              font-size: 10px;
              color: #999999;
            }
            &:first-child {
              margin-left: 0;
            }
            &:nth-child(5n) {
              margin-left: 0;
            }
          }
        }
        .change {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-top: 1px solid #ccc;
        }
      }
      .member {
        box-sizing: border-box;
        padding: 20px 0 0 0;
        background: #fff;
        .title {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          box-sizing: border-box;
          padding: 0 20px;
          border-left: 2px solid red;
        }
        .member_container {
          .setloop {
            width: 220%;
            box-sizing: border-box;
            padding: 20px 20px;
            display: flex;
            .member_contain {
              flex: 1;
              margin: 0 0 10px 11px;
              img {
                width: 85px;
                height: 110px;
              }
              .name {
                display: block;
                width: 80px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 10px;
                color: #333333;
              }
              .author {
                display: block;
                font-size: 10px;
                color: #999999;
              }
              &:first-child {
                margin-left: 0;
              }
            }
          }
        }
        .change {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-top: 1px solid #ccc;
        }
      }
    }
  }
</style>

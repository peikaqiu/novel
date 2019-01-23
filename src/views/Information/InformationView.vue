<template>
  <div>
    <div v-show="isAjax" class="loding">请求中</div>
    <div class="information" ref="inforLoop">
      <div class="information_contain">
        <div class="header">
          <div class="header_container">
            <span class="iconfont icon-arrow-left-copy" @click="back"></span>
            <span class="name">{{getInfor.title}}</span>
            <span class="iconfont icon-sousuo" @click="search"></span>
            <span class="iconfont icon-caidan"></span>
          </div>
          <div class="container">
            <div class="pic">
              <img :src="getInfor.cover | getImgUrl">
            </div>
            <div class="msg">
              <span class="title">{{getInfor.title}}</span>
              <span class="author">{{getInfor.author}}</span>
              <span class="scord">{{getInfor.rating.score}}分/{{getInfor.rating.count}}人评过</span>
              <span class="type">{{getInfor.cat}}/{{getInfor.minorCate}}</span>
              <span class="wordCount">{{getInfor.wordCount}}|完本</span>
            </div>
          </div>
          <div class="btn">
            <div class="item"><span class="active">免费试读</span></div>
            <div class="item right"><span>VIP订阅</span></div>
          </div>
          <div class="download">下载读书App,新人免费畅读</div>
        </div>
        <div class="info_box">
          <div class="info" @click="showInfo" :class="{active:info}">{{getInfor.longIntro}}</div>
          <div class="chapters" @click="toChapter">
            <span class="directory">目录</span>
            <span class="time">{{getInfor.updated}} · {{getInfor.lastChapter}}</span>
            <span class="iconfont icon-arrow-right"></span>
          </div>
        </div>
        <split></split>
        <div class="member">
          <div class="title">作者其他书籍</div>
          <div class="member_container" ref="authorLoop">
            <div class="setloop">
              <div class="member_contain" v-for="(item,index) in getAuthorBooks" :key="index"
                   @click="sendVid({id:item._id,author:item.author,book:item._id})">
                <img :src="item.cover | getImgUrl">
                <span class="member_name">{{item.title}}</span>
                <span class="member_author">{{item.author}}</span>
              </div>
            </div>
          </div>
        </div>
        <split></split>
        <div class="say_container">
          <div class="contain">
            <span class="title">书评区</span>
            <span class="num">{{getSayBook.length}}条评论</span>
          </div>
          <div class="say" v-for="(item,index) in getSayBook" :key="index">
            <div class="pic">
              <img :src="`http://statics.zhuishushenqi.com${item.author.avatar}`">
            </div>
            <div class="msg">
              <span class="name">{{item.author.nickname}}</span>
              <span class="message">{{item.content}}</span>
              <span class="time">{{item.created.slice(0,-8).replace('T',' ')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import {getimg} from '../../assets/js/getImg'
  import BScroll from 'better-scroll'
  import Split from "../../components/widget/Spilt";
  export default{
    components: {Split},
    data(){
      return {
        info: false
      }
    },
    computed: {
      ...mapGetters(['getInfor', 'getAuthorBooks', 'getSayBook']),
      ...mapState(['isAjax'])
    },
    methods: {
      ...mapActions(['getInformation']),
      back(){
        this.$router.back()
      },
      showInfo(){
        this.info = !this.info
      },
      sendVid({id, author, book}){
        this.$router.push({path: '/Information'})
        this.getInformation({axios: this.axios, id: id, author: author, book})
      },
      search(){
          this.$router.push({path:'/SearchView'})
      },
      toChapter(){
        this.$router.push({path:'/ChapterView'})
      }
    },
    filters: {
      getImgUrl(val){
        return getimg(val)
      }
    },
    created(){
      this.$nextTick(() => {
        if (!this.inforScroll) {
          this.inforScroll = new BScroll(this.$refs.inforLoop, {
            click: true,
          })
        } else {
          this.inforScroll.refresh()
        }
        console.log(this.$refs.authorLoop);
        if (!this.authorScroll) {
          this.authorScroll = new BScroll(this.$refs.authorLoop, {
            click: true,
            scrollX: true
          })
        } else {
          this.authorScroll.refresh()
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .loding {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
    line-height: 40px;
    background: #f2f2f2;
  }

  .information {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
    line-height: 40px;
    background: #f2f2f2;
    .information_contain {
      .header {
        width: 100%;
        padding: 0 15px 15px 15px;
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
            flex: 1;
          }
          .icon-caidan {
            font-size: 20px;
          }
        }
        .container {
          display: flex;
          .pic {
            flex: 0 0 100px;
            img {
              width: 90px;
              height: 120px;
            }
          }
          .msg {
            flex: 1;
            .title {
              display: block;
              height: 20px;
              line-height: 20px;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 8px;
            }
            .author,
            .scord,
            .type,
            .wordCount {
              display: block;
              height: 20px;
              line-height: 20px;
              font-size: 14px;
              margin-bottom: 5px;
            }
          }
        }
        .btn {
          display: flex;
          margin-bottom: 15px;
          text-align: center;
          .item {
            flex: 1;
            .active {
              background: #ed424b;
              color: #fff;
            }
            span {
              padding: 5px 20px;
              background: #fff;
              border-radius: 5px;
            }
          }
        }
        .download {
          height: 30px;
          line-height: 30px;
          border: 1px solid #dbdada;
          border-radius: 3px;
          text-align: center;
          background: #fff;
        }
      }
      .info_box {
        width: 100%;
        padding: 0 15px 15px 15px;
        box-sizing: border-box;
        background: #fff;
        .info {
          height: 80px;
          overflow: hidden;
          box-sizing: border-box;
          padding: 10px 0;
          text-indent: 2rem;
          line-height: 25px;
          background: #fff;
        }
        .active {
          height: 100%;
        }
        .chapters {
          border-top: 1px solid #ccc;
          margin-top: 10px;
          display: flex;
          .directory {
            flex: 1;
            font-size: 18px;
            font-weight: 700;
          }
          .time {
            display: inline-block;
            flex: 0 0 200px;
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .icon-arrow-right {
            flex: 0 0 30px;
          }
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
            width: 140%;
            box-sizing: border-box;
            padding: 10px 20px;
            display: flex;
            .member_contain {
              flex: 1;
              margin: 0 0 0 11px;
              img {
                width: 85px;
                height: 110px;
              }
              .member_name {
                display: block;
                width: 80px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 10px;
                color: #333333;
              }
              .member_author {
                height: 20px;
                line-height: 20px;
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
      .say_container {
        width: 100%;
        box-sizing: border-box;
        padding: 0 0 0 15px;
        background: #fff;
        .contain {
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #ccc;
          .title {
            font-size: 20px;
            font-weight: 700;
          }
          .num {
            margin-left: 15px;
            font-size: 16px;
            color: #969ba3;
          }
        }
        .say {
          display: flex;
          box-sizing: border-box;
          padding: 20px 0;
          border-bottom: 1px solid #ccc;
          .pic {
            flex: 0 0 70px;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%
            }
          }
          .msg {
            flex: 1;
            .name {
              display: block;
              height: 20px;
              line-height: 20px;
              margin-bottom: 5px;
              color: #a39bab;
            }
            .message {
              display: block;
              line-height: 20px;
              margin-bottom: 5px;
            }
            .time {
              display: block;
              height: 20px;
              line-height: 20px;
              color: #a39bab;
            }
          }
        }
      }
    }
  }
</style>

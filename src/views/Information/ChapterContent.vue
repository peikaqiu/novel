<template>
  <div>
    <transition name="topSlide">
      <div class="goback" v-if="top"><span class="iconfont icon-arrow-left-copy" @click="back"></span></div>
    </transition>
    <div class="ChapterContent" ref="ChapterContentLoop" @click="dotPlace">
      <div class="content" :class="{active:night}">
        <div class="book">
          {{getChaptersContents}}
        </div>
      </div>
    </div>
    <transition name="footSlide">
      <div class="foot" v-if="top">
        <div class="list">
          <div class="item" @click="allBook">
            <span class="icon"><i class="iconfont icon-mulu"></i></span>
            <span class="list_title">目录</span>
          </div>
          <div class="item" @click="setBN">
            <span class="icon"><i class="iconfont icon-zhangjie-01"></i></span>
            <span class="list_title">进度</span>
          </div>
          <div class="item" @click="setFont">
            <span class="icon"><i class="iconfont icon-ziti"></i></span>
            <span class="list_title">设置</span>
          </div>
          <div class="item" v-if="day" @click="changedn">
            <span class="icon"><i class="iconfont icon-yejian"></i></span>
            <span class="list_title">夜间</span>
          </div>
          <div class="item" v-if="night" @click="changedn">
            <span class="icon"><i class="iconfont icon-rijian"></i></span>
            <span class="list_title">日间</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="cardSlide">
      <div class="addCard" v-if="top" @click="sentLove">加入书架</div>
    </transition>
    <div class="setfont" v-if="big">
      <div>
        <span class="dec">A-</span>
        <mu-flex fill style="padding: 0 50px; margin-top: 10px">
          <mu-slider v-model="size" :min="18" :step="1" :max="30"/>
        </mu-flex>
        <span class="add">A+</span>
      </div>
      <div class="bgcolor">
        <span class="colorOne" @click="changOne(0)"></span>
        <span class="colorTwo" @click="changOne(1)"></span>
        <span class="colorThree" @click="changOne(2)"></span>
        <span class="colorFour" @click="changOne(3)"></span>
      </div>
    </div>
    <div class="setBN" v-if="beNext">
      <div class="before"><span @click="before">上一章</span></div>
      <div class="next"><span @click="next">下一章</span></div>
    </div>

    <transition name="draw">
      <div class="title" v-show="showDraw" @click="closeAllBook">
        <div class="title_box" ref="drawLoop">
          <div class="content">
            <div class="header">
              <div class="chapter_title">目录</div>
              <div class="resove">
                <span class="total">共{{getChaptersItem.length}}章</span>
                <span class="down" @click.stop="revers">{{reverNum ? '倒序' : '正序'}}</span>
              </div>
            </div>
            <div class="chapter_container">
              <div class="chapter_content" v-for="(item,index) in getChaptersItem" :key="index"
                   @click="setChapterContent({links:item.link,ind:index})">
                {{item.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import Split from "../../components/widget/Spilt";
  export default{
    components: {Split},
    data(){
      return {
        top: false,
        high: null,
        day: true,
        night: false,
        big: false,
        size: 18,
        close: false,
        beNext: false,
        showDraw: false,
        reverNum: true
      }
    },
    computed: {
      ...mapGetters(['getChaptersContents', 'getbgColor', 'getChaptersItem']),
      ...mapState({
        index: state => state.data.index
      })
    },
    created(){
      this.$nextTick(() => {
        if (!this.ChapterContentScroll) {
          this.ChapterContentScroll = new BScroll(this.$refs.ChapterContentLoop, {
            click: true
          })
        } else {
          this.ChapterContentScroll.refresh()
        }
      })
    },
    methods: {
      ...mapActions(['getChaptersContent']),
      ...mapMutations(['GET_INDEX', 'GET_LOVE_BOOK', 'GET_SET_BOOK', 'RES_CHAPTERS']),
      back(){
        this.$router.back()
      },
      dotPlace(e){
        console.log(e.offsetY);
        if (e.clientY >= 150 && e.clientY <= 550) {
          this.top = !this.top
          this.big = false
          this.beNext = false
        }
        if (e.clientY > 550) {
          this.high = e.clientY
          this.ChapterContentScroll.scrollBy(0, -e.clientY, 1000)
        }
        if (e.clientY < 150) {
          if (this.high === null) {
            return
          }
          this.ChapterContentScroll.scrollBy(0, this.high, 1000)
        }
        if (e.offsetY < 150) {
          this.high = 100
          this.ChapterContentScroll.scrollBy(0, this.high, 1000)
        }
      },
      changedn(){
        this.day = !this.day
        this.night = !this.night
      },
      setFont(){
        this.big = !this.big
        this.beNext = false
      },
      changOne(val){
        let bg = document.querySelector('.content')
        console.log(bg)
        bg.style.background = this.getbgColor[val]
      },
      setBN(){
        this.beNext = !this.beNext
        this.big = false
      },
      allBook(){
        this.showDraw = true
      },
      closeAllBook(){
        this.showDraw = false
      },
      setChapterContent({links, ind}){
        this.GET_INDEX(ind)
        let link = encodeURIComponent(links)
        this.getChaptersContent({axios: this.axios, link})
        this.$router.push({path: '/ChapterContent'})
      },
      next(){
        let indexs = 0
        if (this.index == this.getChaptersItem.length - 1) {
          return
        }
        else {
          indexs = this.index
          this.GET_INDEX(indexs + 1)
          let url = this.getChaptersItem[indexs + 1].link
          let link = encodeURIComponent(url)
          this.getChaptersContent({axios: this.axios, link})
          this.$router.push({path: '/ChapterContent'})
        }
      },
      before(){
        let indexs = 0
        if (this.index == 0) {
          return
        }
        else {
          indexs = this.index
          this.GET_INDEX(indexs - 1)
          let url = this.getChaptersItem[indexs - 1].link
          let link = encodeURIComponent(url)
          this.getChaptersContent({axios: this.axios, link})
          this.$router.push({path: '/ChapterContent'})
        }
      },
      sentLove(){
        this.GET_LOVE_BOOK()
        this.GET_SET_BOOK()
      },
      revers(){
        this.showDraw = true
        console.log(this.showDraw);
        this.RES_CHAPTERS()
        this.reverNum = !this.reverNum
      }
    },
    watch: {
      size(newVal, oldVal){
        if (newVal !== oldVal) {
          let text = document.getElementsByClassName('book')[1]
          text.style.fontSize = `${newVal}px`
        }
      },
      showDraw(newVal, oldVal){
        if (newVal && newVal!==oldVal) {
            this.$nextTick(() => {
              if (!this.drawScroll) {
                this.drawScroll = new BScroll(this.$refs.drawLoop, {
                  click: true
                })
              } else {
                this.drawScroll.refresh()
              }
              this.drawScroll.scrollTo(0,0)
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goback {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #13120f;
    height: 40px;
    line-height: 40px;
    color: #fff;
    span {
      margin-left: 15px;
    }
  }

  .topSlide-enter-active,
  .topSlide-leave-active {
    transition: all .5s linear;
  }

  .topSlide-enter {
    transform: translateY(-100%);
    opacity: 0.3;
  }

  .topSlide-leave-to {
    transform: translateY(-100%);
    opacity: 1;
  }

  .addCard {
    position: fixed;
    top: 150px;
    right: 0;
    z-index: 99;
    height: 40px;
    line-height: 40px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background: #13120f;
    color: #fff;
    padding: 0 10px;
  }

  .cardSlide-enter-active,
  .cardSlide-leave-active {
    transition: all .5s linear;
  }

  .cardSlide-enter {
    transform: translateX(100%);
    opacity: 0.3;
  }

  .cardSlide-leave-to {
    transform: translateX(100%);
    opacity: 1;
  }

  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #13120f;
    color: #fff;
    .list {
      display: flex;
      text-align: center;
      .item {
        flex: 1;
        span {
          display: block;
        }
        .icon-mulu,
        .icon-zhangjie-01,
        .icon-ziti,
        .icon-yejian,
        .icon-rijian {
          font-size: 25px;
        }
        .icon-mulu {
          color: #78b7ff;
        }
        .icon-zhangjie-01 {
          color: #ff737a;
        }
        .icon-ziti {
          color: #ffa978;
        }
        .icon-yejian {
          color: #ffd95e;
        }
        .icon-rijian {
          color: #ffd95e;
        }
        .list_title {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }

  .footSlide-enter-active,
  .footSlide-leave-active {
    transition: all .5s linear;
  }

  .footSlide-enter {
    transform: translateY(100%);
    opacity: 0.3;
  }

  .footSlide-leave-to {
    transform: translateY(100%);
    opacity: 1;
  }

  .setfont {
    position: fixed;
    bottom: 61px;
    left: 0;
    right: 0;
    z-index: 2;
    background: #13120f;
    color: #fff;
    height: 130px;
    .dec {
      position: absolute;
      left: 15px;
      top: 5px;
      font-size: 22px;
    }
    .add {
      position: absolute;
      right: 15px;
      top: 5px;
      font-size: 22px;
    }
    .bgcolor {
      display: flex;
      box-sizing: border-box;
      padding: 20px 20px 20px 10px;
      span {
        flex: 1;
        display: inline-block;
        height: 40px;
        margin-left: 10px;
        border-radius: 10px;
      }
      .colorOne {
        background: #dbcba7;
      }
      .colorTwo {
        background: #cad9e8;
      }
      .colorThree {
        background: #d1edd1;
      }
      .colorFour {
        background: #e6e6e6;
      }
    }
  }

  .setBN {
    position: fixed;
    bottom: 61px;
    left: 0;
    right: 0;
    z-index: 2;
    background: #13120f;
    color: #fff;
    height: 80px;
    line-height: 80px;
    display: flex;
    text-align: center;
    .before,
    .next {
      flex: 1;
      span {
        box-sizing: border-box;
        padding: 10px;
        background: #ccc;
        border-radius: 10px;
      }
    }
  }

  .title {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    background: rgba(0, 0, 0, .3);
    color: #fff;
    .title_box {
      position: fixed;
      bottom: 0;
      right: 0;
      top: 0;
      width: 360px;
      background: #fff;
      z-index: 10;
      .content {
        .header {
          width: 100%;
          padding: 15px;
          box-sizing: border-box;
          background: #fff;
          color: #33373d;
          border-bottom: 1px solid #ccc;
          .chapter_title {
            height: 40px;
            line-height: 40px;
          }
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
          .chapter_title {
            text-align: center;
            font-size: 18px;
          }
          .resove {
            color: #33373d;
            display: flex;
            .total {
              flex: 1;
              font-weight: 700;
            }
            .down {
              flex: 0 0 35px;
            }
          }
        }
        .chapter_container {
          box-sizing: border-box;
          padding: 0 0 0 15px;
          .chapter_content {
            box-sizing: border-box;
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            color: #33373d;;
          }
        }
      }
    }
  }

  .draw-enter-active,
  .draw-leave-active {
    transition: all .1s linear;
  }

  .draw-enter {
    transform: translateX(100%);
    opacity: 0.3;
  }

  .draw-leave-to {
    transform: translateX(100%);
    opacity: 1;
  }

  .ChapterContent {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 40px;
    background: #c4b399;
    .content {
      background: #c4b399;
      .book {
        line-height: 30px;
        font-size: 20px;
        letter-spacing: 2px;
      }
    }
    .active {
      background: #1a1a1a !important;
      color: #4c616f;
    }
  }
</style>

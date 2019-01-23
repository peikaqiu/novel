<template>
  <div>
    <div v-show="isAjax" class="loding">请求中</div>
    <div class="chapter" ref="chapterLoop">
      <div class="content">
        <div class="header">
          <div class="header_container">
            <span class="iconfont icon-arrow-left-copy" @click="back"></span>
            <span class="name">分类</span>
            <span class="iconfont icon-sousuo" @click="search"></span>
            <span class="iconfont icon-caidan"></span>
          </div>
          <div class="chapter_title">目录</div>
          <div class="resove">
            <span class="total">共{{getChaptersItem.length}}章</span>
            <span class="down" @click.stop="revers">{{reverNum ? '倒序' : '正序'}}</span>
          </div>
        </div>
        <split></split>
        <div class="chapter_container">
          <div class="chapter_content" v-for="(item,index) in getChaptersItem" :key="index"  @click="setChapterContent({links:item.link,ind:index})">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState,mapActions,mapMutations} from 'vuex'
  import Split from "../../components/widget/Spilt";
  import BScroll from 'better-scroll'
  export default{
      data(){
          return{
            reverNum: true
          }
      },
    components: {Split},
    computed: {
      ...mapGetters(['getChaptersItem']),
      ...mapState(['isAjax'])
    },
    methods: {
      ...mapActions(['getChaptersContent']),
      ...mapMutations(['GET_INDEX','RES_CHAPTERS']),
      back(){
        this.$router.back()
      },
      search(){
        this.$router.push({path: '/SearchView'})
      },
      setChapterContent({links,ind}){
        this.GET_INDEX(ind)
        let link = encodeURIComponent(links)
        this.getChaptersContent({axios:this.axios, link})
        this.$router.push({path:'/ChapterContent'})
      },
      revers(){
        this.RES_CHAPTERS()
        this.reverNum = !this.reverNum
      }
    },
    created(){
        this.$nextTick(() => {
          if (!this.chapterScroll) {
            this.chapterScroll = new BScroll(this.$refs.chapterLoop, {
              click: true
            })
          } else {
            this.chapterScroll.refresh()
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .chapter {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 40px;
    background: #fff;
    .header {
      width: 100%;
      padding: 0 15px 0 15px;
      box-sizing: border-box;
      background: #fff;
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
      }
    }
  }
</style>

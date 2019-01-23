<template>
  <div class="search-view">
    <div class="header">
      <div class="inp">
        <input type="text" v-model="str" placeholder="搜索">
        <div class="search_text">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </div>
      <span class="cancel" @click="back">取消</span>
      <div class="search" v-show="str.length" @click="search"><span>搜索</span></div>
    </div>
    <div class="book" ref="bookLoop">
      <div class="book_content">
        <router-link to="/Information">
          <div class="item_box" v-for="(item,index) in getSearchBook" :key="index" @click="sentId({id:item._id,author:item.author,book:item._id})">
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
                  <div class="cat"><span>{{item.cat}}</span></div>
                  <div class="wordCount"><span>{{item.wordCount}}万字</span></div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import {getimg} from '../../assets/js/getImg'
  export default{
    data(){
      return {
        str: ""
      }
    },
    computed: {
      ...mapGetters(['getSearchBook']),
      ...mapState(['isAjax'])
    },
    methods: {
      ...mapActions(['getSearch','getInformation']),
      back(){
        this.$router.back()
      },
      search(){
        if(!this.str.trim()){
          return
        }
        this.getSearch({axios: this.axios, keyword: this.str})
          .then(() => {
            this.$nextTick(() => {
              if (!this.bookScroll) {
                this.bookScroll = new BScroll(this.$refs.bookLoop, {
                  click: true
                })
              } else {
                this.bookScroll.refresh()
              }
            })
          })
      },
      sentId({id,author,book}){
        this.getInformation({axios:this.axios, id:id , author:author, book:book})
      }
    },
    filters: {
      getImgUrl(val){
        return getimg(val)
      }
    },
    beforeRouteEnter:(to,from,next)=>{
      next(vm =>{
        vm.$nextTick(() => {
          if (!vm.bookScroll) {
            vm.bookScroll = new BScroll(vm.$refs.bookLoop, {
              click: true
            })
          } else {
            vm.bookScroll.refresh()
          }
        })
      })
    }/*,
    created(){
      this.$nextTick(() => {
        if (!this.bookScroll) {
          this.bookScroll = new BScroll(this.$refs.bookLoop, {
            click: true
          })
        } else {
          this.bookScroll.refresh()
        }
      })
    }*/
  }
</script>

<style lang="scss" scoped>
  .search-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
    line-height: 40px;
    background: #f2f2f2;
    .header {
      display: flex;
      position: relative;
      .inp {
        border: 1px solid #f2f2f2;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 2px;
        height: 35px;
        line-height: 35px;
        flex: 1;
        input {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          outline: 0;
          border: 0;
          padding: 0 0 0 30px;
        }
        .search_text {
          position: absolute;
          top: 0;
          left: 5px;
          .icon-sousuo {
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
      .cancel {
        flex: 0 0 50px;
        text-align: center;
        font-size: 18px;
      }
      .search {
        position: absolute;
        right: 7px;
        span {
          padding: 3px 5px;
          background: #f7f7f7;
          font-size: 18px;
        }
      }
    }
    .book {
      position: fixed;
      top: 40px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .book_content{
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
    }
  }
</style>

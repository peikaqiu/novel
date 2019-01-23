<template>
  <div class="ClassifyContent" ref="classifyLoop">
    <div class="content">
      <div class="header">
        <div class="header_container">
          <span class="iconfont icon-arrow-left-copy" @click="back"></span>
          <span class="name">{{title}}</span>
          <span class="iconfont icon-sousuo" @click="search"></span>
          <span class="iconfont icon-caidan"></span>
        </div>
      </div>
      <div class="book">
        <div class="book_content">
          <div class="item_box" v-for="(item,index) in getClassifyContentTitle" :key="index" @click="sentId({id:item._id,author:item.author,book:item._id})">
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
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState,mapActions} from 'vuex'
  import {getimg} from '../../assets/js/getImg'
  import BScroll from 'better-scroll'
  export default{
    computed: {
      ...mapState({
        title: state => state.data.title
      }),
      ...mapGetters(['getClassifyContentTitle'])
    },
    methods: {
      ...mapActions(['getInformation']),
      back(){
        this.$router.back()
      },
      search(){
        this.$router.push({path: '/SearchView'})
      },
      sentId({id,author,book}){
        this.getInformation({axios:this.axios, id:id , author:author, book:book})
        this.$router.push({path:'/Information'})
      }
    },
    filters: {
      getImgUrl(val){
        return getimg(val)
      }
    },
    created(){
        this.$nextTick(() => {
            if(!this.classifyScroll){
                this.classifyScroll = new BScroll(this.$refs.classifyLoop,{
                    click:true
                })
            }else {
                this.classifyScroll.refresh()
            }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .ClassifyContent {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 40px;
    background: #f2f2f2;
    .content{
      .header {
        width: 100%;
        padding: 0 15px 0 15px;
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
        .middle {
          text-align: center;
        }
        .right {
          text-align: right;
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
      .book {
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
  }
</style>

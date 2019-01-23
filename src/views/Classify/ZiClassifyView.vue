<template>
  <div class="classify" ref="classifyLoop">
    <div class="classify_box">
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
      <div class="classify_contain">
        <div class="fuclassify" v-for="(item,index) in getFuClassify.female" :key="index"
             v-show="getZiClassify.female[index].mins.length>0">
          <div class="futitle" @click="getKeyeord(item.name)">
            {{item.name}}
            <span class="count">共{{item.bookCount}}本作品</span>
            <i class="iconfont icon-arrow-right"></i>
          </div>
          <div class="ziclassify" v-for="(items,index) in getZiClassify.female" :key="index"
               v-if="items.major === item.name">
            <div class="ziclassi" v-for="(iten,index) in items.mins" :key="index">
              <span class="ziTitle" @click="getsonKeyword(item.name,$event)">{{iten}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  export default{
    computed: {
      ...mapGetters(['getFuClassify', 'getZiClassify'])
    },
    methods: {
      ...mapActions(['getClassifyContent']),
      ...mapMutations(['SET_TITLE']),
      back(){
        this.$router.push({path:'/'})
      },
      search(){
        this.$router.push({path: '/SearchView'})
      },
      setTomale(){
        this.$router.push({path: '/FuClassify'})
      },
      getKeyeord(keyword){
        console.log(keyword);
        this.SET_TITLE(keyword)
        this.getClassifyContent({axios:this.axios, gender:'female', major:keyword, minor:''})
        this.$router.push({path:'/ClassifyContent'})
      },
      getsonKeyword(keyword,e){
        console.log(keyword,e);
        this.SET_TITLE(e.target.innerHTML)
        this.getClassifyContent({axios:this.axios, gender:'female', major:keyword, minor:e.target.innerHTML})
        this.$router.push({path:'/ClassifyContent'})
      }
    },
    created(){
      this.$nextTick(() => {
        if (!this.classifyScroll) {
          this.classifyScroll = new BScroll(this.$refs.classifyLoop, {
            click: true
          })
        } else {
          this.classifyScroll = refresh()
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .classify {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 40px;
    background: #f2f2f2;
    .classify_box{
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
      .classify_contain {
        width: 100%;
        box-sizing: border-box;
        padding: 0 0 0 20px;
        background: #fff;
        .fuclassify {
          .futitle {
            width: 100%;
            border-bottom: 1px solid #ccc;
            font-size: 20px;
            position: relative;
            .count{
              margin-left: 5px;
              font-size: 14px;
              color: #969ba3;
            }
            .icon-arrow-right{
              position: absolute;
              right: 15px;
            }
          }
          .ziclassify {
            box-sizing: border-box;
            padding: 10px 0 0 0;
            .ziclassi {
              display: inline-block;
              .ziTitle {
                border: 1px solid #969ba3;
                border-radius: 20px;
                padding: 2px 10px;
                margin-left: 10px;
                color: #969ba3;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
</style>

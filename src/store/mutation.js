import * as types from './mutation-types'

export default {
  [types.GET_SEARCH_BOOK](state, book){
    state.data.searchBook = book
    console.log(state.data.searchBook);
  },
  [types.IS_AJAX](state, val){
    state.isAjax = val
  },
  [types.GET_INFORMATION](state, infor){
    state.data.information = infor
  },
  [types.GET_HOT_RANK](state, hot){  //热搜榜
    let hotrank = hot.ranking.books
    let randoms = [];
    while (true) {
      let isExists = false;
      // 获取一个0-16范围的数
      let random = parseInt(0 + 16 * (Math.random()))
      // 判断当前随机数是否已经存在
      for (let i = 0; i < randoms.length; i++) {
        if (random === randoms[i]) {
          isExists = true;
          break;
        }
      }
      // 如果不存在，则添加进去
      if (!isExists)
        randoms.push(random);
      // 如果有10位随机数了，就跳出
      if (randoms.length === 8)
        break;
    }
    let result = []
    for (let i = 0; i < randoms.length; i++) {
      result[i] = hotrank[randoms[i]]
    }
    state.data.hotRank = result
  },
  [types.GET_VIP_RANK](state, member){  //VIP榜
    let books = member.ranking.books
    let randoms = []
    while (true) {
      let isExits = false
      let random = parseInt(100 * Math.random())
      for (let i = 0; i < randoms.length; i++) {
        if (random === randoms[i]) {
          isExits = true
          break
        }
      }
      if (!isExits) {
        randoms.push(random)
        if (randoms.length === 8) {
          break
        }
      }
    }
    let result = []
    for (let i = 0; i < randoms.length; i++) {
      result[i] = books[randoms[i]]
    }
    state.data.memberVip = result
  },
  [types.GET_AUTHOR](state, author){    //作者
    state.data.authorBook = author.books
  },
  [types.GET_SAY_BOOK](state, data){       //评论
    state.data.sayBook = data.posts
  },
  [types.IS_LODING](state, val){      //LODING
    state.isLoding = val
  },
  [types.FU_CLASSIFY](state, data){   //父分类
    console.log(data);
    state.data.fuClassify = data
  },
  [types.ZI_CLASSIFY](state, data){   //子分类
    state.data.ziClassify = data
  },
  [types.GET_Classify_Conten](state, data){
    console.log(data.books);
    state.data.classifyContent = data.books
  },
  [types.SET_TITLE](state, val){
    state.data.title = val
  },
  [types.GET_CHAPTERS](state, data){
    console.log(data.chapters);
    state.data.chapters = data.chapters
  },
  [types.GET_CHAPTERS_CONTENT](state, data){
    //console.log(data.chapter.cpContent);
    state.data.chaptersContent = data.chapter.cpContent
  },
  [types.GET_RANKING](state, data){   //排行榜
    console.log(data);
    state.data.ranking = data
  },
  [types.GET_ZI_RANKING](state, data){  //子排行榜
    console.log(data);
    state.data.ziRanking = data
  },
  [types.GET_RANKING_ID](state, val){
    state.data.rankingTotal = state.data.ziRanking[val]
  },
  [types.GET_INDEX](state, val){
    state.data.index = val
  },
  [types.GET_LOVE_BOOK](state){
    state.data.loveBook.push(state.data.information)
  },
  [types.GET_SET_BOOK](state){
    let arr = state.data.loveBook
    let hash = {};
    arr = arr.reduce((preVal, curVal) => {  //累加器
      hash[curVal._id] ? '' : hash[curVal._id] = true && preVal.push(curVal);
      return preVal
    }, [])
    console.log(hash);   //{59c9f516abf35b3e65044672: 1, 546809880b6a62a33bf9f69a: 2}
    state.data.setBook = arr
  },
  [types.DEL_LOVE_BOOK](state,index){
    console.log(state.data.loveBook);
    state.data.loveBook = state.data.loveBook.splice(index+1)
    console.log(state.data.loveBook);
  },
  [types.RES_CHAPTERS](state){
    state.data.chapters = state.data.chapters.reverse()
  }
}

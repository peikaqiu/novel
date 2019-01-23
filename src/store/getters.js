export default {
  getSearchBook(state){
    return state.data.searchBook.books
  },
  getInfor(state){
    console.log(state.data.information);
    return state.data.information
  },
  getHotRanks(state){
    console.log(state.data.hotRank);
    return state.data.hotRank
  },
  getVipBooks(state){
    console.log(state.data.memberVip);
    return state.data.memberVip
  },
  getAuthorBooks(state){
    console.log(state.data.authorBook);
    return state.data.authorBook
  },
  getSayBook(state){
    console.log(state.data.sayBook);
    return state.data.sayBook
  },
  getFuClassify(state){
    return state.data.fuClassify
  },
  getZiClassify(state){
    return state.data.ziClassify
  },
  getClassifyContentTitle(state){
    return state.data.classifyContent
  },
  getChaptersItem(state){
    return state.data.chapters
  },
  getChaptersContents(state){
    return state.data.chaptersContent
  },
  getRankings(state){
    return state.data.ranking
  },
  getZiRankings(state){
    return state.data.ziRanking
  },
  getRankingTotal(state){
    return state.data.rankingTotal
  },
  getbgColor(state){
    return state.data.bgColor
  }
}

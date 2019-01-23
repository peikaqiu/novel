import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action'
import mutations from './mutation'
import getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data:{
      searchBook:{},
      information:{},
      hotRank:{},
      memberVip:{},
      authorBook:{},
      sayBook:{},
      fuClassify:{},
      ziClassify:{},
      classifyContent:{},
      title:'',               //分类头部名字
      chapters:{},
      chaptersContent:{},   //章节内容
      ranking:{},          //排行榜
      ziRanking:[],
      idNum:[],
      rankingTotal:{},
      bgColor:['#dbcba7','#cad9e8','#d1edd1','#e6e6e6'],
      index:null,
      loveBook:[],
      setBook:[]
    },
    isAjax:false,
    isLoding:false
  },
  getters,
  mutations,
  actions,
});

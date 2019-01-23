import * as types from './mutation-types'

export default {
  getSearch({commit}, {axios, keyword}){  //搜索
    return new Promise(resolve => {
      axios.get('/api/search', {
        params: {
          keyword
        }
      })
        .then(
          (res) => {
            let data = JSON.parse(res.data)
            commit(types.GET_SEARCH_BOOK, data)
            resolve() // 异步函数执行完毕
          })
    })
  },
  getInformation({commit, dispatch}, {axios, id, author, book}){  //书详情
    commit(types.IS_AJAX, true)
    axios.all([
      axios.get('/api/information', {  //书籍详情
        params: {
          id
        }
      }),
      axios.get('/api/say', {   //评论
        params: {
          book
        }
      }),
      axios.get('/api/bookresources', {  //书籍源
        params: {
          book
        }
      })
    ])
      .then(axios.spread(function (info, saybook, bookres) {
        let data = JSON.parse(info.data)     //书籍详情
        commit(types.GET_INFORMATION, data)

        let saybooks = JSON.parse(saybook.data)  //评论
        commit(types.GET_SAY_BOOK, saybooks)

        let bookfrom = JSON.parse(bookres.data)[0]._id

        dispatch('getAuthor', {axios, author})   //作者相关

        dispatch('getChapters', {axios, id: bookfrom})
        commit(types.IS_AJAX, false)
      }))
  },
  getHotRank({commit}, {axios}){  //热搜
    commit(types.IS_LODING, true)
    axios.get('/api/recommend')
      .then((res) => {
        let data = JSON.parse(res.data)
        commit(types.GET_HOT_RANK, data)
        commit(types.IS_LODING, false)
      })
  },
  getVip({commit}, {axios}){ //vip
    axios.get('/api/member')
      .then((res) => {
        let data = JSON.parse(res.data)
        commit(types.GET_VIP_RANK, data)
      })
  },
  getAuthor({commit}, {axios, author}){ //作者
    axios.get('/api/author', {
      params: {
        author
      }
    })
      .then((res) => {
        let data = JSON.parse(res.data)
        commit(types.GET_AUTHOR, data)
      })
  },
  getClassify({commit}, {axios}){  //父子分类
    commit(types.IS_AJAX, true)
    axios.all([
      axios.get('/api/fuclassify'),
      axios.get('/api/ziclassify')
    ])
      .then(axios.spread(function (fuclass, ziclass) {
        let fuclassify = JSON.parse(fuclass.data)
        commit(types.FU_CLASSIFY, fuclassify)
        let ziclassify = JSON.parse(ziclass.data)
        commit(types.ZI_CLASSIFY, ziclassify)
        commit(types.IS_AJAX, false)
      }))
  },
  getClassifyContent({commit}, {axios, gender, major, minor}){   //请求分类内容
    commit(types.IS_AJAX, true)
    axios.get('/api/classcontent', {
      params: {
        gender,
        type: 'hot',
        major,
        minor,
        stare: 0
      }
    })
      .then(
        (res) => {
          let data = JSON.parse(res.data)
          commit(types.GET_Classify_Conten, data)
          commit(types.IS_AJAX, false)
        }
      )
  },
  getChapters({commit}, {axios, id}){   //请求章节
    commit(types.IS_AJAX, true)
    axios.get('/api/chapters', {
      params: {
        id
      }
    })
      .then(
        (res) => {
          let data = JSON.parse(res.data)
          commit(types.GET_CHAPTERS, data)
          commit(types.IS_AJAX, false)
        })
  },
  getChaptersContent({commit}, {axios, link}){  //章节内容
    commit(types.IS_AJAX, true)
    axios.get('/api/chaptercontent', {
      params: {
        link
      }
    })
      .then((res) => {
        let data = JSON.parse(res.data)
        commit(types.GET_CHAPTERS_CONTENT, data)
        commit(types.IS_AJAX, false)
      })
  },
  getRanking({commit, state}, {axios}){        //男排行榜
    return new Promise(resolve => {
      axios.get('/api/rank')
        .then((res) => {
          let data = JSON.parse(res.data)
          commit(types.GET_RANKING, data)
          let idArr = [];
          for (let i = 0; i < data.male.length; i++) {
            idArr[i] = data.male[i]._id
          }
          state.data.idNum = idArr
          resolve() // 异步函数执行完毕
        })
    })
  },
  getZiRanking({commit}, {axios, rank}){      //排行榜子分类
    commit(types.IS_AJAX, true)
    let record = []
    for (let i = 0; i < rank.length; i++) {
      record[i] = axios.get('/api/zirank', {
        params: {
          rank: rank[i]
        }
      })
    }
    axios.all(record)
      .then(axios.spread(function (...data) {
        let record = [...data]
        for (let i = 0; i < record.length; i++) {
          record[i] = JSON.parse(record[i].data).ranking
        }
        commit(types.GET_ZI_RANKING, record)
        commit(types.IS_AJAX, false)
      }))
  },
  getFemaleRanking({commit, state}, {axios}){        //女排行榜
    return new Promise(resolve => {
      axios.get('/api/rank')
        .then((res) => {
          let data = JSON.parse(res.data)
          commit(types.GET_RANKING, data)
          let idArr = [];
          for (let i = 0; i < data.female.length; i++) {
            idArr[i] = data.female[i]._id
          }
          state.data.idNum = idArr
          resolve() // 异步函数执行完毕
        })
    })
  }
}

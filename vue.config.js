//引入superagent
const ajax = require('superagent')

module.exports = {
  devServer: {
    before: function (app) {
      app.get('/api/search', (req, res) => {  //搜索
        ajax.get("http://novel.juhe.im/search?")
          .query(req.query)
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/information', (req, res) => { //书详情
        let id = req.query.id
        ajax.get(`http://novel.juhe.im/book-info/${id}`)
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/recommend', (req, res) => { //热搜榜
        ajax.get('http://novel.juhe.im/rank/5a323096fc84c2b8efab2482')
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/member', (req, res) => { //vip
        ajax.get('http://novel.juhe.im/rank/57eb959df60eb7e21fb3a8b7')
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/author', (req, res) => { //作者书籍
        ajax.get('http://novel.juhe.im/author-books?')
          .query(req.query)
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/say', (req, res) => {
        ajax.get('https://novel.juhe.im/book/discussions?')
          .query(req.query)
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/bookresources', (req, res) => {  //书籍源
        console.log(req.query)
        ajax.get('http://novel.juhe.im/book-sources?')
          .query(req.query)
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/chapters', (req, res) => { //章节
        let id = req.query.id
        ajax.get(`http://novel.juhe.im/book-chapters/${id}`)
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/chaptercontent', (req, res) => {  //章节内容
        let link = req.query.link
        ajax.get(`http://novel.juhe.im/chapters/${link}`)
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/fuclassify', (req, res) => {  //父分类
        ajax.get('http://novel.juhe.im/categories')
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/ziclassify', (req, res) => {  //子分类
        ajax.get('http://novel.juhe.im/sub-categories')
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/classcontent', (req, res) => { //分类内容
        ajax.get('http://novel.juhe.im/category-info?')
          .query(req.query)
          .end((err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data.text)
          })
      })
      app.get('/api/rank', (req, res) => {   //排行榜
        ajax.get('http://novel.juhe.im/rank-category')
          .end((err, data) => {
          if(err){
            console.log(err);
          }
          res.json(data.text)
          })
      })
      app.get('/api/zirank', (req, res) => {  //子排行榜
        let rank = req.query.rank
        ajax.get(`http://novel.juhe.im/rank/${rank}`)
          .end((err, data) => {
          if(err){
            console.log(err);
          }
          res.json(data.text)
          })
      })
    }
  }
}

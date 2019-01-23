import Vue from 'vue';
import Router from 'vue-router';
import SearchView from '../views/Home/SearchView'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/SearchView',
      name: 'SearchView',
      component: SearchView
    },
    {
      path: '/Information',
      name: 'Information',
      component: () => import('../views/Information/InformationView.vue'),
    },
    {
      path: '/FuClassify',
      name: 'FuClassify',
      component: () => import('../views/Classify/FuClassifyView.vue'),
    },
    {
      path: '/ZiClassify',
      name: 'ZiClassify',
      component: () => import('../views/Classify/ZiClassifyView.vue'),
    },
    {
      path: '/ClassifyContent',
      name: 'ClassifyContent',
      component: () => import('../views/Classify/ClassifyContent.vue'),
    },
    {
      path: '/ManRanking',
      name: 'ManRanking',
      component: () => import('../views/Ranking/ManRanking.vue'),
    },
    {
      path: '/FemaleRanking',
      name: 'FemaleRanking',
      component: () => import('../views/Ranking/FemaleRanking.vue'),
    },
    {
      path: '/ChapterView',
      name: 'ChapterView',
      component: () => import('../views/Information/ChapterView.vue'),
    },
    {
      path: '/ChapterContent',
      name: 'ChapterContent',
      component: () => import('../views/Information/ChapterContent.vue'),
    },
    {
      path: '/EveryRanking',
      name: 'EveryRanking',
      component: () => import('../views/Ranking/EveryRanking.vue'),
    },
    {
      path: '/LoveBookView',
      name: 'LoveBookView',
      component: () => import('../views/LoveBook/LoveBookView.vue'),
    }
  ]
})

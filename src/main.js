import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import Muse from './muse-ui-config'
import './assets/sass/_icon.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Muse)
Vue.use(VueAxios,axios)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

store.dispatch('getRanking',{axios})
store.dispatch('getHotRank',{axios})
store.dispatch('getVip',{axios})




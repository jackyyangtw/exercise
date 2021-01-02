import Vue from 'vue'
import App from './App.vue'
import axios from 'axios' //主要ajax套件
import VueAxios from 'vue-axios' //轉為vue套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(VueAxios, axios)


Vue.config.productionTip = false
Vue.component('Loading', Loading);


new Vue({
  render: h => h(App),
}).$mount('#app')

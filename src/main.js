import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import meta from 'meta-agent'
Vue.config.productionTip = false

Vue.prototype.$mttp = meta({
  baseURL: 'http://aox.hopto.org:8000',
  // baseURL: 'http://192.168.50.251:8000',
  // baseURL: 'http://192.168.50.149:7000'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

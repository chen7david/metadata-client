import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import meta from 'meta-agent'
import config from './../config'
Vue.config.productionTip = false


console.log(config)
Vue.prototype.$mttp = meta({
  baseURL: 'http://aox.hopto.org:8000',
})

Vue.prototype.$config = config

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

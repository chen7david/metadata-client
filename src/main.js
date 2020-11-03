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

Vue.prototype.$mttp = meta({
  baseURL: config.url.metadata,
  timeout: config.url.timeout
})

Vue.prototype.$config = config

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

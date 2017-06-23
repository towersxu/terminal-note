// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
// let VueMaterial = window.VueMaterial // eslint-disable
sync(store, router)

router.beforeEach((to, from, next) => {
  store.commit('ERROR_MSG', '') // 在每次路径切换的时候都自动清空全局错误信息
  next()
})

Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
})

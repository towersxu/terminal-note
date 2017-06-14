<template>
  <div id="app">
    <!-- <v-header :header-option="headerOption"></v-header> -->
    <global-error></global-error>
    <transition name="fade" mode="out-in">
      <router-view class="view content"></router-view>
    </transition>
    <loading></loading>
  </div>
</template>

<script>

/**
 * App模块
 * @module app
 */

import { mapState } from 'vuex'
import VHeader from './components/Header.vue'
import Loading from './components/Loading.vue'
import GlobalError from './components/GlobalError.vue'
import routeList from './router/routeList'

export default{
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    VHeader,
    Loading,
    GlobalError
  },
  /** computed*/
  computed: mapState({
    /** 在此处统一控制路由跳转 {@link computed} */
    pageStatus (state) {
      return state.pageStatus
    },
    headerOption (state) {
      return state.headerOption
    }
  }),
  /** watch*/
  watch: {
    /** 检测到变化进行跳转 {@link watch} */
    pageStatus (newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.$router.push(routeList[newVal])
      }
    }
  }
}
</script>

<style lang="less">
// @import './assets/less/normalize.css';
// @import './assets/less/base.css';
@import "./assets/less/style.less";
</style>

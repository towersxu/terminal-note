<template>
  <div>
    <div class="loading-bar">
      <div class="loading-process" :style="{width: process + '%'}" :class="{'show': show}"></div>
    </div>
  </div>
</template>
<script>
// 在什么时候用这个loading组件？
// 建议在页面POST的时候出现这个较好
// 在
import { mapState } from 'vuex'

export default {
  data () {
    return {
      process: 0,
      show: false, // 控制进度条的透明
      t: '' // 进度条setInterval
    }
  },
  computed: mapState({
    isLoading (state) {
      return state.isLoading
    }
  }),
  watch: {
    isLoading (isLoading) {
      if (this.t) { // 先清除
        clearInterval(this.t)
        this.t = ''
      }

      let baseProcess = 25
      if (isLoading) { // 如果是ture,表示开始加载。。。
        this.show = true
        this.$nextTick(() => {
          // 第0.5秒变成25%，第0.5*2秒变成25+25/1.5,....
          this.process = baseProcess
          baseProcess = Math.ceil(baseProcess / 1.5)
          this.t = setInterval(() => {
            this.process = this.process + baseProcess
            baseProcess = Math.ceil(baseProcess / 1.5)
          }, 500)
        })
      }
      else {
        // 在0.5秒内将进度变成100，然后设置为0
        this.process = 100
        this.t = setTimeout(() => {
          this.show = false
          this.process = 0
          this.t = ''
        }, 500)
      }
    }
  }
}
</script>
<style lang="less">
// @import "../assets/sui/variables.less";
.loading-bar{
  width: 100%;
  height: 0.2rem;
  position: fixed;
  top: 0;
  z-index: 9999;
  .loading-process{
    height: 0.2rem;
    // background: @color-warning;
    border-radius: 0 0.1rem 0.1rem 0;
    transition: width 0.5s linear;
    opacity: 0;
    &.show {
      opacity: 1;
    }
  }
}
</style>

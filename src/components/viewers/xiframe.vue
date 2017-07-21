<script>
  // iframe显示组件
  export default {
    props: {
      info: Object
    },
    mounted () {
      console.log(this.info)
      let iframe = document.createElement('iframe')
      iframe.src = this.info.src
      iframe.style.width = this.info.width
      iframe.style.height = this.info.height
      iframe.style.border = 'none'
      iframe.style.outline = 'none'
      console.log(this.$el)
      let oldEl = document.getElementById('iframe-wrapper')
      oldEl.parentNode.replaceChild(iframe, oldEl)
    }
  }
</script>
<template>
  <md-card md-with-hover>
    <md-card-content>
      <div id="iframe-wrapper">
      </div>
    </md-card-content>
  </md-card>  
</template>
<style scoped>
.iframe-wrapper {
  margin: 0 auto;
  
}
</style>

<script>
  /**
   * ed-markdown,markdown文本编辑器
   */
  import Vue from 'vue'
  import guid from '@/utils/guid.js'
  export default {
    data () {
      return {
        elid: 'markdown' + guid()
      }
    },
    mounted () {
      import('./markdown.vue').then((res) => {
        let Markdown = Vue.extend(res)
        let md = new Markdown()
        // let markdownEl = document.getElementById(this.elid)
        md.$mount(this.$el)
      })
    }
  }
</script>
<template>
  <div>
    <md-spinner md-indeterminate class="md-accent"></md-spinner>
  </div>
</template>

<script>
  /**
   * ed-markdown,markdown文本编辑器
   */
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import guid from '@/utils/guid.js'
  import qiniuUpload from '@/components/upload/qiniuUpload'
  import services from '../../services/index'

  export default {
    computed: mapState({
      user: state => state.user
    }),
    data () {
      return {
        elid: 'markdown' + guid()
      }
    },
    mounted () {
      import('./markdown.vue').then((res) => {
        let Markdown = Vue.extend(res)
        let md = new Markdown()
        md.$on('save', (content) => {
          console.log(content)
          let key = new Date().getTime() + '-' + this.user.id + '.md'
          let type = 'text/x-markdown'
          let qu = qiniuUpload(content, key, type)
          qu.on('success', function () {
            services.addNewArticle({
              title: 'react开始实践',
              type: 'tips',
              tags: ['react', '开发实践', '练习'],
              fileName: key,
              fileBucket: 'markdown'
            })
            .then((res) => {
              console.log(res)
            })
          })
        })
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

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
        md.$on('save', (res) => {
          let key = new Date().getTime() + '-' + this.user.id + '.md'
          let type = 'text/x-markdown'
          let qu = qiniuUpload(res.content, key, type)
          qu.on('success', () => {
            services.addNewArticle({
              title: res.title,
              type: 'tips',
              tags: res.labels,
              fileName: key,
              fileBucket: 'markdown'
            })
            .then((data) => {
              if (data.t === 1) {
                // 成功后生成命令去查询一次。
                let cmd = res.labels.join(' ')
                this.$store.dispatch('search', {
                  cmd: cmd
                })
              }
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

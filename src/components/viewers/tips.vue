<script>
import service from '@/services'
import md from '@/utils/markdown'

export default {
  props: {
    tip: Object,
    path: String
  },
  created () {
    service.getFileByAjax(this.path).then((res) => {
      this.file = res.data
      let html = md.render(res.data)
      this.previewContent = html
      // this.file = res
    })
  },
  data () {
    return {
      file: 'aa',
      previewContent: ''
    }
  }
}
</script>
<template>
  <div v-if="previewContent">
    <div v-html="previewContent"></div>
  </div>
</template>

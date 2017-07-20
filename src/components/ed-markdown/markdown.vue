<script>
import md from '@/utils/markdown'

export default {
  data () {
    return {
      mdtitle: '',
      mdkey: '',
      content: '##header',
      previewContent: '',
      labels: []
    }
  },
  mounted () {
    // md = new MarkdownIt()
    // console.log(43444)
  },
  methods: {
    preview (idx) {
      if (idx === 1) {
        let html = md.render(this.content)
        this.previewContent = html
      }
    },
    save () {
      this.$emit('save', {
        content: this.content,
        labels: this.labels,
        title: this.getTitle()
      })
    },
    setLabel () {
      // TODO: 去掉重复label
      this.labels.push(this.mdkey)
      this.mdkey = ''
    },
    removeLabel (index) {
      this.labels.splice(index, 1)
    },
    getTitle () {
      let title = ''
      let content = this.content.match(/\r|\n/)
      let index = 20
      if (content && content.index) {
        index = content.index
      }
      title = this.content.substr(0, index)
      return title.replace(/\#|>/g, '')
    }
  }
}
</script>
<template>
  <div class="md-wrapper">
    <md-card md-with-hover>
      <md-card-content>
        <div class="key">
          <md-input-container>
            <label>请输入关键字</label>
            <md-input v-model="mdkey" @keyup.native.enter="setLabel()"></md-input>
          </md-input-container>
          <div class="labels">
            <span class="label" v-for="(label, index) in labels" @click="removeLabel(index)">
              <span>{{label}}</span>
            </span>
          </div>
        </div>
        <md-tabs @change="preview" class="card-content">
          <md-tab id="write" md-label="编写">
            <div class="content">
              <textarea class="editor-textarea" v-model="content"></textarea>
              <div class="upload-tips"></div>
            </div>
          </md-tab>

          <md-tab id="preview" md-label="预览">
            <div class="content">
              <div v-html="previewContent"></div>
            </div>
          </md-tab>
        </md-tabs>
      </md-card-content>

      <md-card-actions>
        <md-button @click.native="save">保存</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<style scoped>
.md-wrapper {
  margin: 20px;
  width: 698px;
}
.md-wrapper .card-content {
  padding-bottom: 0;
}
.editor-textarea {
  display: block;
  width: 100%;
  min-height: 200px;
  max-height: 500px;
  padding: 8px;
  resize: vertical;
  border-bottom: 1px dashed #dfe2e5;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  max-width: 100%;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  background-color: #fafbfc;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
}
.key {
  position: relative;
}
.label {
  display: inline-block;
  padding: 0.3em 0.9em;
  margin: 0 0.5em 0.5em 0;
  white-space: nowrap;
  background-color: #f1f8ff;
  border-radius: 3px;
  color: #0366d6;
  font-size: 12px;
}
.label:hover {
  text-decoration: none;
  background-color: #ddeeff;
  color: #ff5722;
}
</style>

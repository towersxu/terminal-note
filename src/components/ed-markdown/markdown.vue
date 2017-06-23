<script>
  // import {markdown} from 'markdown'
  // import MarkdownIt from 'markdown-it'

  var md = require('markdown-it')({
    html: false,        // Enable HTML tags in source
    xhtmlOut: false,        // Use '/' to close single tags (<br />).                                // This is only for full CommonMark compatibility.
    breaks: false,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
                                // useful for external highlighters.
    linkify: false,        // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (str, lang) { return '' }
  }) // eslint-ignore
  // let md = ''
  export default {
    data () {
      return {
        mdtitle: '',
        mdkey: '',
        content: '##header',
        previewContent: ''
      }
    },
    mounted () {
      // md = new MarkdownIt()
      // console.log(43444)
    },
    methods: {
      preview (idx) {
        if (idx === 1) {
          console.log(md)
          console.log(md.render)
          let html = md.render(this.content)
          console.log(html)
          this.previewContent = html
        }
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
            <md-input v-model="mdkey"></md-input>
          </md-input-container>
        </div>
        <md-tabs @change="preview">
          <md-tab id="write" md-label="编写">
            <textarea class="editor-textarea" v-model="content"></textarea>
            <div class="upload-tips"></div>
          </md-tab>

          <md-tab id="preview" md-label="预览">
            <div v-html="previewContent"></div>
          </md-tab>
        </md-tabs>
      </md-card-content>

      <md-card-actions>
        <md-button>保存</md-button>
      </md-card-actions>
    </md-card>

  </div>
</template>
<style scoped>
.md-wrapper {
  margin: 20px;
  width: 698px;
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
</style>

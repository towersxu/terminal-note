<template>
<div class="note-panel">
  <note-list></note-list>
  <div class="input-box">
    <textarea class="input-text" @keydown="send($event)" v-model="noteText"></textarea>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import noteList from './noteList.vue'

export default {
  data () {
    return {
      noteText: ''
    }
  },
  computed: mapState({
    messageType: state => state.messageType
  }),
  mounted () {
    this.$store.dispatch('connectNote')
  },
  methods: {
    send (e) {
      if (e.keyCode === 9) { // tab键，自动补齐
        e.preventDefault()
      }
      if (e.keyCode !== 13 || !e.composed || !e.ctrlKey || !this.noteText) return

      const match1 = this.noteText.match(/^\+(.*)/)
      if (match1) {
        this.$store.dispatch('newNote', {
          content: match1[1]
        })
        this.noteText = ''
        return
      }
      const commend = this.noteText.split(/\s+/)
      if (commend.length > 0 && commend[1] === 'article' && commend[3] === 'markdown') {
        const data = {
          type: this.messageType.markdown,
          key: commend[0],
          subTag: 'article'
        }
        this.$store.commit('NOTE_LIST', data)
      }
      else {
        this.$store.dispatch('sendNote', {
          content: this.noteText
        })
      }
      this.noteText = ''
    }
  },
  components: {
    noteList
  }
}
</script>
<style scoped>
.note-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 200px;
  box-sizing: border-box;
}
.input-box {
  height: 200px;
  width: 100%;
  border-top: 1px solid #969a9b;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 5px 5px 5px;
  display: flex;
  box-sizing: border-box;
}
.input-text {
  width: 100%;
  height: 100%;
  border: none;
  -moz-box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  box-shadow: inner 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.input-text:focus {
    outline: none !important;
    border-color: #fff;
}
</style>

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
      if ((e.keyCode !== 13 && e.keyCode !== 9) || !this.noteText) return
      const commend = this.noteText.split(/ +/)
      let data = {}
      console.log(e.keyCode)
      if (commend[0] === 'markdown') {
        data.type = this.messageType.markdown
        this.$store.commit('NOTE_LIST', Object.assign({}, data))
        this.noteText = ''
      }
      else if (commend[0] === 'clear') {
        this.$store.commit('NOTE_LIST_CLEAR')
        this.noteText = ''
      }
      // iframe add http://10.4.84.19:8080/static/demo/wei.html --width=1280 --height=360 --name="jquery upload demo"
      else if (commend[0] === 'iframe') {
        this.$store.commit('NOTE_LIST', {
          type: this.messageType.iframe,
          src: 'http://10.4.84.19:8080/static/demo/wei.html',
          width: 1280,
          height: 360,
          name: 'jquery upload demo'
        })
        this.noteText = ''
      }
      else {
        // data.type = this.messageType.cmd
        if (e.keyCode === 9) {
          this.$store.dispatch('query', {
            cmd: this.noteText,
            cb: (res) => {
              console.log('cb...')
              console.log(res)
            }
          })
        }
        else {
          this.$store.dispatch('search', {
            cmd: this.noteText
          })
          this.noteText = ''
        }
      }
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
  padding-bottom: 100px;
  box-sizing: border-box;
}
.input-box {
  height: 100px;
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

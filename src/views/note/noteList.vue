<template>
  <div class="chat-content">
    <ul id="msg-list-wrapper">
      <li v-for="list in lists" class="flex-list">
        <div v-if="list.type === messageType.chat">
          <img :src="list.user.avatar_url" class="avatar">
          <div class="msg-panel">
            <span class="appicon icon-chatarrow"></span>
            <p class="name">{{list.user.name}}</p>
            <p class="msg">{{list.text}}</p>
          </div>
        </div>
        <div v-if="list.type === messageType.markdown">
          <markdown></markdown>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import markdown from '../../components/markdown.vue'

export default {
  components: {
    markdown (resolve) {
      import('@/components/ed-markdown').then((res) => {
        console.log(res)
        resolve(res)
      })
      // console.log(resolve)
      // const md = require.ensure(['../../components/markdown.vue'], (res) => {
      //   console.log('require')
      //   console.log(res)
      //   resolve(res)
      // })
      // console.log(md)
      // return md
    }
    // markdown: require.ensure('../../components/markdown.vue')
  },
  computed: mapState({
    lists (state) {
      console.log(222)
      return state.notes
    },
    messageType: state => state.messageType
  }),
  watch: {
    lists () {
      setTimeout(() => {
        let rect = document.getElementById('msg-list-wrapper').getBoundingClientRect()
        this.$el.scrollTop = rect.bottom - rect.top
      })
    }
  }
}
</script>
<style lang="less" scoped>
.chat-content{
  height: 100%;
  overflow: scroll;
  padding: 0.5rem;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
    li {
      position: relative;
      overflow: hidden;
      margin-top: 0.5rem;
    }
  }
}
.avatar {
  border-radius: 50%;
  float: left;
  width: 2rem;
  height: 2rem;
}
.msg-panel {
  float: left;
  padding-left: 0.5rem;
  position: relative;
  p {
    margin: 0;
  }
  .msg {
    background: #fff;
    padding: 0.5rem;
    border-radius: 0.3rem;
  }
}
.icon-chatarrow {
  position: absolute;
  left: 0;
  top: 1rem;
  color: #fff;
  display: block;
  transform: rotate(90deg);
}
.flex-list {
  display: flex;
}
</style>

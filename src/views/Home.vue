<template>
  <div>
    <div class="list-block">
      <ul>
        <!-- Text inputs -->
        <li>
          <div class="item-content">
            <div class="item-media"><i class="icon icon-form-name"></i></div>
            <div class="item-inner">
              <div class="item-title label">姓名</div>
              <div class="item-input">
                <input type="text" placeholder="Your name" v-model="user.name">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="content-block">
      <div class="row">
        <div class="col-50"><a href="#" class="button button-big button-fill button-danger">取消</a></div>
        <div class="col-50"><a href="#" class="button button-big button-fill button-success" @click="getUser()">提交</a></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      grades: '一年级'
    }
  },
  mounted () {
    this.$store.commit('CHANGE_HEAD', {
      title: '个人主页'
    })
  },
  methods: {
    add () {
      this.$store.commit('INCREMENT', 10)
    },
    sub () {
      this.$store.dispatch('incrementAsync')
    },
    getUser () {
      this.$store.dispatch('getGitUser')
    }
  },
  computed: mapState({
    user (state) {
      console.log(state.user)
      return state.user
    }
  })
}
</script>

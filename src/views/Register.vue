<template>
  <div>
    <div id="particles-js"></div>
    <div class="loader-page">
      <day-animate class="day-animate"></day-animate>
      <div class="login-panel">
        <div class="pure-form pure-form-stacked">
          <div class="logo-panel"><img src="../assets/image/logo100.png"></div>
          <input class="username item" type="text" placeholder="邮箱" v-model="account">
          <input class="password item" type="password" placeholder="密码" v-model="password">
          <input class="password item" type="password" placeholder="确认密码" v-model="password2">
          <button class="pure-button btn item pure-button-primary" @click="register">注册</button>
          <legend></legend>
          <div class="github">
            <button class="pure-button btn item">
              <span class="iconfont icon-git"></span>使用GitHub注册</button>
              <div class="register-tips">
                <span class="gray-tips">已有账号？</span><router-link class="register-link" to="/login">登陆</router-link>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../store/api'
import dayAnimate from './svg/day.vue'

export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: '',
      password2: ''
    }
  },
  mounted () {
    this.$store.commit('CHANGE_HEAD', {
      title: '注册'
    })
    window.particlesJS.load('particles-js', 'static/particles.json', () => {
      console.log('callback - particles.js config loaded')
    })
    api.on('register', (data) => {
      if (data.status) {
        this.$router.push({ path: 'login' })
      }
      else {
        this.$store.commit('REGISTER_STATUS', data)
      }
    })
  },
  methods: {
    getUser () {
      this.$store.dispatch({
        type: 'getGitUser',
        name: this.name,
        cb: () => {
          this.$router.push({ path: 'chat' })
        }
      })
    },
    register () {
      if (!this.account || !this.password || !this.password2) {
        return
      }
      if (this.password !== this.password2) {
        this.$store.commit('ERROR_MSG', '密码不一致')
        return
      }
      this.$store.dispatch({
        type: 'register',
        userInfo: {
          account: this.account,
          password: this.password
        }
      })
    }
  },
  components: {
    dayAnimate
  }
}
</script>
<style scoped>
#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #456;
  z-index: -1;
}
.loader-page {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  /*flex-direction: column;*/
}
.loader-page:before{
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  mix-blend-mode: multiply;
}
.day-animate {
  width: 25%;
}
.login-panel {
  width: 500px;
  /*height: 480px;*/
  display: flex;
  justify-content: center;
  position: relative;
  left: -120px;
  background: rgba(255,255,255,0.9);
}
.login-panel .item {
  margin: 20px auto;
  width: 300px;
}
.login-panel .pure-form {
  text-align: center;
  width: 100%;
}
.logo-panel {
  text-align: center;
  margin: 30px;
}
.github .btn {
  height: 40px;
  font-size: 18px;
  color: #fff;
  vertical-align: middle;
}
.github .icon-git {
  font-size: 20px;
  margin-right: 5px;
}
.register-tips {
  text-align: center;
  padding: 20px;
}
.gray-tips {
  color: #9a9a9a;
}
.register-link {
  color: rgb(0, 120, 231);
}
</style>

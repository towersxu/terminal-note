<template>
  <div>
    <div id="particles-js"></div>
    <div class="loader-page">
      <day-animate class="day-animate"></day-animate>
      <div class="login-panel">
        <div class="pure-form pure-form-stacked">
          <div class="logo-panel"><img src="../assets/image/logo100.png"></div>
          <input class="username item" type="text" placeholder="邮箱或者手机号" v-model="account">
          <input class="password item" type="password" placeholder="密码" v-model="password">
          <button class="pure-button btn item pure-button-primary" @click="login">登陆</button>
          <legend></legend>
          <div class="github">
            <button class="pure-button btn item">
              <span class="iconfont icon-git"></span>使用GitHub登陆</button>
              <div class="register-tips">
                <span class="gray-tips">没有账号？</span><router-link class="register-link" to="/register">注册</router-link>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 登陆模块
 * @module Login
 */
import dayAnimate from './svg/day.vue'

export default {
  name: 'login',
  /**
   * 返回初始化数据对象
   * @return {object} 初始化对象
   */
  data () {
    return {
      account: '',
      password: ''
    }
  },
  /**
   * 页面加载时触发
   */
  mounted () {
    /**
     * @desc 触发显示particles-js
     */
    window.particlesJS.load('particles-js', 'static/particles.json', () => {
      console.log('callback - particles.js config loaded')
    })
  },
  methods: {
    login () {
      if (!this.account || !this.password) {
        return
      }
      this.$store.dispatch({
        type: 'login',
        userInfo: {
          account: this.account,
          password: this.password
        },
        cb: () => {
          this.$router.push({name: 'note'})
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

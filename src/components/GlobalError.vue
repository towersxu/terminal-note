<template>
  <div class="ge__wrap" v-if="isShow">
    <span class="error-msg">{{errorMsg}}</span>
    <span @click="close()" class="close">关闭</span>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      isShow: false
    }
  },
  computed: mapState({
    errorMsg (state) {
      return state.errorMsg
    }
  }),
  watch: {
    errorMsg (newVal) {
      this.isShow = !!newVal
    }
  },
  methods: {
    close () {
      this.isShow = false
      this.$store.commit('ERROR_MSG', '')
    }
  }
}
</script>
<style scoped>
.ge__wrap{
  width: 100%;
  height: 80px;
  background: #fff;
  position: fixed;
  text-align: center;
  top: 0;
}
.error-msg {
  line-height: 80px;
  color: #f00;
  font-size: 20px;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>

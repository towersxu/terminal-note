<template>
  <div>
    <!-- <header class="bar bar-nav">
      <h1 class='title'>按钮</h1>
    </header> -->
    <div>
      <div class="content-block badge-button">
        <p><a href="#" class="button" @click="add()">{{button}}</a></p>
        <a class="badge">2</a>
      </div>
      <div class="content-block badge-button">
        <p><a href="#" class="button" @click="sub()">{{name}}</a></p>
        <a class="badge">3</a>
      </div>
      <div class="content-block">
        <p><a href="#" class="button button-round" @click="getUser()">{{msg}}</a></p>
      </div>
      <div class="content-block">
        <p><a href="#" class="button button-round">{{full}}</a></p>
      </div>
      <div class="content-block">
        <p><a href="#" class="button button-big">{{count}} </a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      button: 'Welcome'
    }
  },
  methods: {
    add () {
      this.$store.commit('INCREMENT', 10)
    },
    sub () {
      // this.$store.commit('DECREMENT')
      this.$store.dispatch('incrementAsync')
    },
    getUser () {
      this.$store.dispatch('getGitUser')
    }
  },
  computed: mapState({
    count (state) {
      return state.count + 100
    },
    name: state => state.name,
    msg () {
      return `${this.button} a`
    },
    full (state, getters) {
      return getters.fullName
    }
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.badge-button{
  width: 10rem;
  position: relative;
}
.badge-button .badge{
  position: absolute;
  right: 0;
  top:0;
  background: red;
  color: #fff;
}
</style>

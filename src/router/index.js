import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../views/Hello.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Note from '../views/note/note.vue'

Vue.use(Router)

const routes = [
  { path: '/hello', component: Hello },
  { path: '/note', component: Note },
  { path: '/home', component: Home },
  { path: '/', component: Login },
  { path: '/mobile', component: Login },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

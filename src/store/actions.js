import api from '../services/index'
import storage from '../assets/js/storage'

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT', -3)
    }, 200)
  },
  getGitUser ({ commit }, { name, cb }) {
    commit('LOADING', true)
    api.getGitUser(name, (user) => {
      commit('LOADING', false)
      commit('GET_GIT_USER', user)
      storage.setHash('user', JSON.stringify(user))
      cb()
    })
  },
  joinRoom ({ commit }) {
    api.joinRoom('room1')
    api.on('room:msg', ({ msg }) => {
      commit('MSG_LIST', msg)
    })
  },
  connectNote ({ commit }) {
    api.on('note msg', (data) => {
      console.log('note msgg')
      console.log(data)
      commit('NOTE_LIST', data)
    })
  },
  sendMsg ({ state }, msg) {
    api.sendMsg('room1', {
      msg,
      user: {
        name: state.user.login,
        avatar_url: state.user.avatar_url,
        followers: state.user.followers,
        following: state.user.following
      }
    })
  },
  newNote ({ state }, msg) {
    api.emit('note:new', msg)
  },
  // 发送笔记消息
  sendNote ({ state }, data) {
    api.emit('note msg', data)
  },
  addListen ({ state }, { key, callback }) {
    api.on(key, callback)
  },
  login ({ commit }, { userInfo, cb }) {
    api.login(userInfo).then((data) => {
      commit('LOGIN_STATUS', data)
      if (cb) {
        cb()
      }
    })
    // api.on('login', (data) => {
    //   console.log(data)
    //   commit('LOGIN_STATUS', data)
    // })
  },
  register ({ commit }, { userInfo }) {
    api.register(userInfo)
  },
  getToken ({ commit }, {key, cb}) {
    api.getUploadToken(key)
    api.on('upload token', (data) => {
      cb(data)
    })
  },
  query ({ commit }, {cmd, cb}) {
    api.query(cmd).then((res) => {
      cb(res)
    })
  },
  search ({ commit }, {cmd}) {
    api.search(cmd).then((res) => {
      commit('NOTE_LIST', res)
    })
  }
}

export default actions

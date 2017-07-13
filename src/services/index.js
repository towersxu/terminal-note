/**
 * 和后端进行数据通信
 */
const socketServe = window.SOCKET_SERVER // eslint-disable-line
const axios = window.axios // eslint-disable-line
import qs from 'qs'
axios.defaults.baseURL = 'api' // eslint-disable-line
axios.interceptors.request.use((request) => {
  if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    request.data = qs.stringify(request.data, { allowDots: true })
  }
  if (request.method === 'get') {
    if (request.url.indexOf('?') === -1) {
      request.url += '?noche=' + new Date().getTime()
    }
    else {
      request.url += '&nocha=' + new Date().getTime()
    }
  }
  return request
})

let socket = {}
if (socketServe && !socket.connected) {
  socket = io(socketServe) // eslint-disable-line
  socket.emit('connection')
}

export default {
  keys: [],
  on (key, callback) {
    if (this.keys.indexOf(key) === -1) {
      this.keys.push(key)
    }
    socket.on(key, (msg) => {
      callback(msg)
    })
  },
  getGitUser (name, cb) {
    axios.get(`https://api.github.com/users/${name}`)
    .then((res) => {
      cb(res.data)
    })
    .catch((error) => {
      cb(error)
    })
  },
  joinRoom (roomId) {
    socket.emit('room:join', { roomId })
  },
  login (userInfo) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'users/who',
        data: userInfo,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      // axios.post('homework/draft/save', data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  register (userInfo) {
    socket.emit('register', userInfo)
  },
  sendMsg (roomId, msg) {
    socket.emit('room:msg', { roomId, msg })
  },
  emit (key, data) {
    socket.emit(key, data)
  },
  // getUploadToken (key) {
  //   socket.emit('upload token', {key})
  // },
  getUploadToken (key) {
    return new Promise((resolve, reject) => {
      if (!socket.connected) reject({msg: '无法连接到服务器'})

      socket.emit('upload token', {key})

      socket.on('upload token', (data) => {
        // socket.off('upload token')
        resolve(data)
      })
      socket.on('upload token error', (data) => {
        reject(data)
      })
    })
  },
  addNewArticle (data) {
    return new Promise((resolve, reject) => {
      if (!socket.connected) reject({msg: '无法连接到服务器'})
      console.log(data)
      socket.emit('article:new', data)

      socket.on('article:new', (res) => {
        resolve(res)
      })
    })
  },
  changeArticleTitle (data) {
    return new Promise((resolve, reject) => {
      if (!socket.connected) reject({msg: '无法连接服务器'})

      socket.emit('article:change:title', data)
    })
  },
  query (data) {
    return new Promise((resolve, reject) => {
      if (!socket.connected) reject({msg: '无法连接服务器'})

      socket.emit('query', data)

      socket.on('query', (res) => {
        resolve(res)
      })
    })
  }
}

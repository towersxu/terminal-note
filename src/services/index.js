/**
 * 和后端进行数据通信
 */
const socketServe = window.SOCKET_SERVER // eslint-disable-line
const axios = window.axios // eslint-disable-line
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
    socket.emit('login', userInfo)
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
  }
}

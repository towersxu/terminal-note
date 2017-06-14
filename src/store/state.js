import storage from '../assets/js/storage'

const state = {
  user: {},
  list: [],
  notes: [],
  messageType: {
    markdown: 1, // 消息类型， 1， markdown
    chat: 2 // 消息类型，聊天
  },
  isLoading: false,
  pageStatus: 0, // 0-操作失败；1-登陆成功；2-注册成功
  errorMsg: '',
  headerOption: {
    title: 'READER FOR GITHUB'
  }
}

function setStateStore (obj) {
  Object.keys(obj).forEach((key) => {
    const attr = storage.getHash(key)
    if (attr) {
      try {
        obj[key] = JSON.parse(attr)
      }
      catch (e) {
        storage.removeHash(key)
      }
    }
  })
  return obj
}

setStateStore(state)

export default state

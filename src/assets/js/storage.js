// 将指定的值缓存到sessionStorage中
import stringUtil from './hashUtil'
export default {
  setHash(key, val) {
    key = stringUtil.getHashCode(key)
    window.sessionStorage.setItem(key, val) // eslint-disable-line
  },
  getHash(key) {
    key = stringUtil.getHashCode(key)
    return window.sessionStorage.getItem(key) // eslint-disable-line
  },
  removeHash(key) {
    key = stringUtil.getHashCode(key)
    return window.sessionStorage.removeItem(key) // eslint-disable-line
  },
  set(key, val) {
    window.sessionStorage.setItem(key, val) // eslint-disable-line
  },
  get(key) {
    return window.sessionStorage.getItem(key) // eslint-disable-line
  }
}

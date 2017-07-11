const axios = window.axios // eslint-disable-line
import store from '../assets/js/storage.js'
/**
 * service中统一处理。如果要每个接口单独处理缓存就不要使用这个了
 * @param  {[type]} url [description]
 * @param {number} storeMode 模式 - 1 表示将接口缓存到session中. 2 表示带有过期时间的模式
 * @param {number} expire 过期时间(秒)。模式为2时需要
 * @return {[type]}     [description]
 */
export default function (url, storeMode, expire) {
  return new Promise((resolve, reject) => {
    let data = ''
    if (storeMode === 1) {
      data = store.getHash(url)
    }
    else if (storeMode === 2) {
      data = store.getExpireHash(url)
    }
    if (data) {
      resolve(data)
      return
    }
    axios.get(url)
    .then(({data}) => {
      if (data.ok) {
        if (storeMode === 1) {
          store.setHash(url, data.data)
        }
        else if (storeMode === 2) {
          store.setExpireHash(url, data.data, expire)
        }
        resolve(data.data)
      }
      else {
        reject(data.msg)
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}

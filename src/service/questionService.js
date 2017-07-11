import utils from '@/assets/js/utils.js'
import commonPromise from './commonPromise'
// const axios = window.axios // eslint-disable-line
export default {
  /**
   * 获取题目接口
   */
  // getQuestion (type_id, resource_id) {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`question/type/${type_id}/resource/${resource_id}`)
  //     .then((res) => {
  //       resolve(res.data)
  //     })
  //     .catch((error) => {
  //       reject(error)
  //     })
  //   })
  // },
  /**
   * 教师获取试做题目
   */
  getPreviewQuestion (typeId, rcId) {
    let url = ''
    if (utils.isWordType(typeId)) {
      url = `homework/preview/question?type_id=${typeId}&column_id=${rcId}`
    }
    else {
      url = `homework/preview/question?type_id=${typeId}&resource_id=${rcId}`
    }
    return commonPromise(url)
  }
}

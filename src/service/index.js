/**
 * 和后端进行数据通信
 */
const axios = window.axios // eslint-disable-line
import qs from 'qs'
axios.defaults.baseURL = window.ProjectContext + 'service' // eslint-disable-line
axios.defaults.timeout = 20000 // eslint-disable-line
// TODO: 需要将所有的错误都改为reject吗？就算后端返回的是200，但是只要内容出错就reject。这里需要等正式开发研究。
// TODO: 是否需要做请求参数验证？

import commonService from './commonService'
import homeworkService from './homeworkService'
import stuHomeworkService from './stuHomeworkService'
import questionService from './questionService'

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

export default Object.assign(commonService, homeworkService, stuHomeworkService, questionService)

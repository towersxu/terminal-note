/**
 * 和后端进行数据通信
 */
const axios = window.axios // eslint-disable-line

import commonPromise from './commonPromise'

export default {
  /**
   * getAuth
   * @description 获取用户信息
   * @return {object} {id:'001',type:'1'} - 用户信息
   */
  getAuth ({userId, pkey, time}) {
    return new Promise((resolve, reject) => {
      axios.get(`user/who?userId=${userId}&pkey=${pkey}&time=${time}`)
      .then(({data}) => {
        if (data.ok) {
          let user = data.data
          if (user.role === 'teacher') {
            user.type = 2
          }
          else if (user.role === 'student') {
            user.type = 1
          }
          else if (user.role === 'admin') {
            user.type = 2
          }
          else if (user.role === 'system') {
            user.type = 2
          }
          else {
            user.type = 0
          }
          resolve(user)
        }
        else {
          reject(data.msg)
        }
      })
      .catch((error) => {
        reject(error)
      })
    })
    // return commonPromise(`user/who?userId=${userId}&pkey=${pkey}&time=${time}`, 2, 60)
  },
  /**
   * 获取banner.不同的学校banner可能不一样。
   * @param {string} school_id - 学校Id
   */
  getBanner (school_id) {
    return commonPromise(`manage/banner/${school_id}`, 1)
  },
  /**
   * 获取教材列表
   * 目前接口没说分页，但是应该有吧，先写上
   * @param {number} page - 当前页
   * @param {number} page_size - 每页大小
   */
  getBooks (page = 1, page_size = 15, level = 6) {
    return commonPromise(`column/level/${level}?page=${page}&page_size=${page_size}`, 1)
  },
  /**
   * 获取章节目录
   * @param {string} id - 目录Id
   * @return {promise}
   */
  getColumn (id) {
    return commonPromise(`column/subs/${id}`, 1)
  },
  /**
   * 获取当前老师切换章节目前所在的位置
   */
  getColumnPosition () {
    // return commonPromise('homework/draft/get_postion')
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'homework/draft/get_postion',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      // axios.post('homework/draft/save', data)
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 设置老师当前布置作业所在的章节目录位置，用户下次进来在同样的位置
   * @param {object} position - 位置
   * @param {string} position.id - 位置ID
   * @param {string} position.bookId - 教材ID
   * @param {string} position.unitId - 单元ID
   * @param {string} position.lessonId - 课程ID
   * @param {string} position.resourceId - 资源ID
   */
  setColumnPosition (position) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'homework/draft/save_postion',
        data: position,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      // axios.post('homework/draft/save', data)
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 获取app的下载地址
   * @param {string} school_id - 学校Id
   */
  getDownloadUrls (school_id) {
    return commonPromise(`app/${school_id}/info`)
  }
}

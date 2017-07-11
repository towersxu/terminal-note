/**
 * 和后端进行数据通信
 */
const axios = window.axios // eslint-disable-line
import commonPromise from './commonPromise'

export default {
  /**
   * 获取作业列表
   * @type {Number}
   */
  getHomeworks (page = 1, page_size = 6) {
    return commonPromise(`homework/querylist?page=${page}&page_size=${page_size}`)
    // return new Promise((resolve, reject) => {
    //   axios.get(`homeworks/${user_id}?page=${page}&page_size=${page_size}`)
    //   .then(({data}) => {
    //     data.ok ? resolve(data.data) : reject(data.msg)
    //   })
    //   .catch((error) => {
    //     reject(error)
    //   })
    // })
  },
  deleteHomework (homeworkId) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `homework/delete/${homeworkId}`,
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
  /**
   * 获取作业学生答题情况.
   * todo:同样的请求缓存1分钟，因为是通过hover触发的。也相当于1分钟更新一次学生答题情况
   */
  getHomeworkStudents (homework_id, class_id, answered_status = 2) {
    return commonPromise(`homework/${homework_id}/class/${class_id}/student/${answered_status}`, 2, 60)
  },
  /**
   * 获取作业草稿
   * @param {user_id} user_id - 用户Id
   * @return {promisd}
   */
  getHomeworkDrafts () {
    return new Promise((resolve, reject) => {
      axios.get('homework/draft')
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 作业草稿预览
   * @param {user_id} user_id - 用户Id-不要user_id了
   */
  getHomeworkPreview (user_id) {
    return commonPromise('homework/preview')
    // return new Promise((resolve, reject) => {
    //   axios.get(`homework/preview/${user_id}`)
    //   .then(({data}) => {
    //     data.ok ? resolve(data.data) : reject(data.msg)
    //   })
    //   .catch((error) => {
    //     reject(error)
    //   })
    // })
  },
  /**
   * 获取作业资源
   * @param {string} lesson_id - 课程Id
   * @return {Promise}
   */
  getResources (lesson_id) {
    return new Promise((resolve, reject) => {
      axios.get(`question/column/${lesson_id}`)
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 创建、修改作业草稿
   */
  postHomeworkDraft (user_id, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'homework/draft/save',
        data: data,
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
  /**
   * 删除作业草稿
   */
  deleteHomeworkDraft (data) {
    return new Promise((resolve, reject) => {
      // axios.post('homework/draft/delete', data)
      axios({
        method: 'post',
        url: 'homework/draft/delete',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(({data}) => {
        data.ok ? resolve() : reject()
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 保存作业
   */
  postHomework (data) {
    return new Promise((resolve, reject) => {
      // axios.post('homework/save', data)
      axios({
        method: 'post',
        url: 'homework/save',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(({status, data}) => {
        if (status === 200 && data.ok) resolve(data)
        else {
          reject(data.msg)
        }
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 查看作业答题情况
   */
  getHomeworkView (homework_id) {
    return new Promise((resolve, reject) => {
      axios.get(`homework/${homework_id}/view`)
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 查看班级作业资源
   */
  getClassHomework (homework_id, class_id) {
    return new Promise((resolve, reject) => {
      axios.get(`homework/${homework_id}/class/${class_id}`)
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 查看班级学生答题情况
   */
  getClassHomeworkStudent (homework_id, class_id, page = 1, page_size = 10, orderObject = '') {
    return new Promise((resolve, reject) => {
      axios.get(`homework/${homework_id}/class/${class_id}/students?page=${page}&page_size=${page_size}${orderObject}`)
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 获取作业学生排名
   */
  getHomeworkStudentRank (stuhomework_id, class_id) {
    return commonPromise(`homework/${stuhomework_id}/class/${class_id}/rank`)
  }
}

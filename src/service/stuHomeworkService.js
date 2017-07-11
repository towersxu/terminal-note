const axios = window.axios // eslint-disable-line

import commonPromise from './commonPromise'

export default {
  /**
   * 学生获取作业列表
   */
  getStuHomeworkList (user_id) {
    return new Promise((resolve, reject) => {
      axios.get(`homework/stu/homeworkList/${user_id}`)
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 获取学生作业详情
   */
  getStuHomework (stuhomework_id) {
    return commonPromise(`homework/stuhomeworkinfo/${stuhomework_id}`)
  },
  /**
   * 获取学生答题卡
   */
  getStuHomeworkCard (stuHomework_id) {
    return commonPromise(`homework/${stuHomework_id}/answersheet`)
  },
  /**
   * 获取学生作业资源
   * @param {string} homeworkId - 作业ID
   * @param {number} qtypeId - 题型Id
   * @param {string} resourceId - 资源ID 段落必填
   * @param {string} columnId - 章节ID 单词必填
   * @param {string} status - 作业状态。1表示已做。0表示未做
   */
  getStuHomeworkResource ({homeworkId, qtypeId, resourceId, columnId, status}) {
    let url = ''
    if (resourceId) {
      url = `homework/${homeworkId}/answersheet/question?stuhomework_id=${homeworkId}&qtype_id=${qtypeId}&resource_id=${resourceId}&status=${status}`
    }
    else {
      url = `homework/${homeworkId}/answersheet/question?stuhomework_id=${homeworkId}&qtype_id=${qtypeId}&column_id=${columnId}&status=${status}`
    }
    return commonPromise(url)
  },
  /**
   * 学生提交作业答案
   * @param {object} data 提交作业对象
   */
  postStuHomework (data) { // 学生答题
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `homework/update/${data.stuhomework_id}`,
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 学生完成作业
   */
  finishStuHomework (stuhomework_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `homework/finish/${stuhomework_id}`,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 学生保存作业资源
   */
  postStuResource (data) {
    if (data.answer) {
      let d = JSON.parse(JSON.stringify(data)) // 改变成新对象。这样才不会修改原来的对象
      data = d
      data.answer = JSON.stringify(d.answer) // 后端要求存字符串
    }
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `homework/save/${data.stuhomework_id}`,
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  /**
   * 切换模式后，如果当前模式下的题目已答，更新题目
   */
  updateMode (data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `homework/update/${data.stuhomework_id}/${data.model}`,
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(({data}) => {
        data.ok ? resolve(data.data) : reject(data.msg)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}

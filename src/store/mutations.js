const mutations = {
  CHANGE_HEAD (states, headerOption) {
    states.headerOption = headerOption
  },
  UP_TITLE (states, title) {
    states.title = title
  },
  GET_GIT_USER (states, user) {
    states.user = user
  },
  INCREMENT (states, count) {
    states.count += count
  },
  DECREMENT (states) {
    states.count -= 1
  },
  LOADING (states, LoadingStatus) {
    states.isLoading = LoadingStatus
  },
  MSG_LIST (states, msg) {
    states.list.push(msg)
  },
  NOTE_LIST (states, msg) {
    console.log(states.notes)
    states.notes.push(msg)
    console.log(states.notes)
  },
  NOTE_LIST_CLEAR (states, msg) {
    states.notes = []
  },
  LOGIN_STATUS (states, msg) {
    states.pageStatus = msg.status ? 3 : 0
    states.errorMsg = msg.message
  },
  REGISTER_STATUS (states, data) {
    states.pageStatus = data.status ? 1 : 0
    states.errorMsg = data.message
  },
  ERROR_MSG (states, msg) {
    states.errorMsg = msg
  }
}

export default mutations

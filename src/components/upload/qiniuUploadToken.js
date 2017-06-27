import services from '../../services/index'
/**
 * 获取上传凭证
 * @param {string} 上传文件的key
 * @return {[type]} [description]
 */
function getUploadToken (key) {
  return new Promise((resolve, reject) => {
    services.getUploadToken(key)
    .then((data) => {
      resolve(data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export default getUploadToken

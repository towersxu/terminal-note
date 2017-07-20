import qiniuUploadToken from './qiniuUploadToken'

/**
 * 上传文件到七牛，需要先向后端获取上传凭证
 * @param  {[type]} data                              [description]
 * @param  {String} [type='application/octet-stream'] [description]
 * @return {[type]}                                   [description]
 */
function qiniuUpload (data, key, type = 'application/octet-stream') {
  let upObject = {
    keys: {
      // progress: function () {},
      // success: function () {},
      // error: function () {}
    },
    on: function (key, fn) {
      this.keys[key] = fn
    }
  }
  qiniuUploadToken(key)
  .then((token) => {
    let blob = ''
    if (typeof data === 'string') {
      blob = new Blob([data], {type})
    }
    if (!key) {
      key = 'web' + '-' + new Date().getTime()
    }
    let formData = new FormData()
    formData.append('Content-Type', type)
    formData.append('token', token)
    formData.append('key', key)
    formData.append('file', blob, key)
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://up-z2.qiniu.com')
    // xhr.open('POST', 'http://localhost:8080/api/upload')
    xhr.send(formData)
    xhr.upload.addEventListener('progress', (e)=> {
      xhr.percent = (e.loaded / e.total) * 100
      console.log('progress')
      console.log(22222)
      if (typeof upObject.keys.progress === 'function') {
        upObject.keys.progress(xhr.percent)
      }
    })
    if (upObject.keys) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState < 4) {
          return
        }
        if (xhr.status < 400) {
          var res = JSON.parse(xhr.responseText)
          if (typeof upObject.keys.success === 'function') {
            upObject.keys.success(res)
          }
        }
        else {
          var resTxt = xhr.responseText || '{}'
          var err = JSON.parse(resTxt)
          if (typeof upObject.keys.error === 'function') {
            upObject.keys.error(err)
          }
        }
      }
    }
  })
  .catch((err) => {
    if (typeof upObject.keys.error === 'function') {
      upObject.keys.error(err)
    }
  })
  return upObject
}

export default qiniuUpload

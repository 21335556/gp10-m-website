// 调用接口数据 暴露接口
const list = require('./listmore.json')

module.exports = function () {
  return {
    'list':list
  }
}
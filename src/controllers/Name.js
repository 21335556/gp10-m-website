

module.exports = function getData() {
  return $.ajax({
    url: '/api/listmore.json?pageNo=1&pageSize=15',    //把接口地址拿到链接
    type: 'get',
    success(result) {
      return result
    }
  })
}

// // import fetch from '../models/fetch'
// const fetch = require('../models/fetch')

// exports.test = async () => {
//   let result = await fetch.get('/api/listmore.json?pageNo=1&pageSize=15')
//   console.log(result);
// }
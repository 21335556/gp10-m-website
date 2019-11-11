export default {
  get(url) {
    return $.ajax({
      url,    //把接口地址拿到链接
      type: 'get',
      success(result) {
        return result
      }
    })
  }
}

// exports.get = (url) => {
//   return $.ajax({
//     url,    //把接口地址拿到链接
//     type: 'get',
//     success(result) {
//       return result
//     }
//   })
// }
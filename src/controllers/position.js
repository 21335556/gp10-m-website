
const positionListTpl = require('../views/position.list.html')
const BScroll = require('better-scroll').default

import fetch from '../models/fetch'

let positionList = []
let currentPage = 1

// 拿出接口数据
  const renderList = async () => {
    // const getData = async () => {
    //   await fetch.get('/api/listmore.json?pageNo=1&pageSize=15')
    //   let data = result.content.data.page.result
    //   let renderedIndexTpl = template.render(indexTpl, { data })
    //   $('#app').html(renderedIndexTpl)
    // }
    // getData()

    let result = await fetch.get('/api/listmore.json?pageNo=1&pageSize=15')
    let data = positionList = result.content.data.page.result
    
    let renderedpositionListTpl = template.render(positionListTpl, { data })
    $('#position-list').html(renderedpositionListTpl)

    let bScroll = new BScroll('#index-scroll', {
      probeType: 1
    })

    let head = $('.head img'),
      topImgHasClass = head.hasClass('up')
    let foot = $('.foot img'),
      bottomImgHasClass = head.hasClass('down')

    // 初始化位置
    bScroll.scrollTo(0, -40)

    // 绑定滑动事件
    bScroll.on('scroll', function () {
      // console.log(this.y);
      let y = this.y;
      let maxY = this.maxScrollY - y

      // console.log(this.maxScrollY);
      // console.log($('#index-scroll > div').height());

      // 下拉，当隐藏的loading完全显示的时候触发
      if (y >= 0) {
        !topImgHasClass && head.addClass('up')
        return
      }

      // 上拉，当滚动到最底部时候触发
      if (maxY >= 0) {
        !bottomImgHasClass && foot.addClass('down')
        return
      }
    })

    // 绑定手指松开触发事件
    bScroll.on('scrollEnd',async function () {
      // 下拉刷新处理
      if (this.y >= -40 && this.y < 0) {
        this.scrollTo(0, -40)
        head.removeClass('up')
      } else if (this.y >= 0) {
        head.attr('src', '/images/ajax-loader.gif')

        // 异步加载数据
        let result = await fetch.get(`/api/listmore.json?pageNo=2&pageSize=8`)
        let data = positionList = [...result.content.data.page.result, ...positionList]
        let renderedpositionListTpl = template.render(positionListTpl, { data })
        $('#position-list').html(renderedpositionListTpl)
        
        // 刷新后位置自动回弹
        this.refresh()   //当dom 解构发生变化时务必调动确保滚动效果正常
        this.scrollTo(0, -40)
        foot.removeClass('up')
        head.attr('src', '/images/arrow.png')

      }
      // 下拉加载处理
      let maxY = this.maxScrollY - this.y
      if (maxY > -40 && maxY < 0) {
        this.scrollTo(0, this.maxScrollY + 40);
        foot.removeClass('down')
      } else if (maxY >= 0) {
        foot.attr('src', '/images/ajax-loader.gif');

        // 异步加载数据
        let result = await fetch.get(`/api/listmore.json?pageNo=${++currentPage}&pageSize=15`)
        let data = positionList = [ ...positionList,...result.content.data.page.result]
        let renderedpositionListTpl = template.render(positionListTpl, { data })
        $('#position-list').html(renderedpositionListTpl)

         // 刷新后位置自动回弹
         this.refresh()   //当dom 解构发生变化时务必调动确保滚动效果正常
         this.scrollTo(0, this.maxScrollY + 40)
         foot.removeClass('up')
         head.attr('src', '/images/arrow.png')
 
      }
    })

    
  }

  export default {
    renderList
  }
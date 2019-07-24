// pages/news/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1552623252516,
    time:"",
    content:[],
    firstImage:'',
    readCount:0,
    title:"",
    source:"",
    imgwidth: 698,
    imgheight:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("new onLoad!")

    console.log(this.data.imgheight)
    let id = options.id
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log("request success id:",id)
        console.log(res)
        let result =res.data.result
        let content =result.content
        let time = result.date.slice(11,16)
        let firstImage =result.firstImage
        let readCount = result.readCount
        let source = result.source
        let title = result.title
        this.setData({
          content:content,
          time:time,
          firstImage:firstImage,
          readCount:readCount,
          source:source,
          title:title
        })
        console.log(this.data.id)
      }
    })
  },
  imageLoad: function (event) {
    console.log("image load:", event)
    let size = event.detail
    let width = this.data.imgwidth
    let height = parseInt(width * size.height / size.width)
    console.log("new:", width, height)
    this.data.imgheight[event.currentTarget.id] = height
    this.setData({
      imgheight: this.data.imgheight
    })
    console.log("imgheight:",this.data.imgheight)
  }
})
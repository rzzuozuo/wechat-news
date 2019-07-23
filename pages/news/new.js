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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("new onLoad!")
    let id = options.id
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id
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
  }
})
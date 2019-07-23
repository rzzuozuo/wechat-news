// pages/news/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1552623252516
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("new onLoad!")
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: 1552623252516
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log("get detail succes id:",this.data.id)

        console.log(res)
      }
    })
  }
})
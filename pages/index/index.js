//index.js
Page({
  data: {
    newstype: [{
        id: '国内',
        type: "gn"
      },
      {
        id: '国际',
        type: "gj"
      }, {
        id: '财经',
        type: 'cj'
      }, {
        id: '娱乐',
        type: 'yl'
      }, {
        id: '军事',
        type: 'js'
      }, {
        id: '体育',
        type: 'ty'
      }, {
        id: '其他',
        type: 'qt'
      }
    ],
    newsArray: []
  },
  onLoad() {
    this.getNews()
  },
  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNews() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', //仅为示例，并非真实的接口地址
      data: {
        type: "gn"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        this.data.newsArray = res.data.result.concat(this.data.newsArray)
        this.setData({
          newsArray: this.data.newsArray
        })
        console.log(this.data.newsArray)
      }
    })
  }
})
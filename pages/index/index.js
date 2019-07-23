//index.js
Page({
  data: {
    newstype: [{
        id: '国内',
        type: "gn",
        news: [],
        height: '0',
        color: '#f6cb76'
      },
      {
        id: '国际',
        type: "gj",
        news: [],
        height: '0',
        color: '#ffffff'
      },
      {
        id: '财经',
        type: 'cj',
        news: [],
        height: '0',
        color: '#ffffff'
      }, {
        id: '娱乐',
        type: 'yl',
        news: [],
        height: '0',
        color: '#ffffff'
      }, {
        id: '军事',
        type: 'js',
        news: [],
        height: '0',
        color: '#ffffff'
      }, {
        id: '体育',
        type: 'ty',
        news: [],
        height: '0',
        color: '#ffffff'
      }, {
        id: '其他',
        type: 'other',
        news: [],
        height: '0',
        color: '#ffffff'
      }
    ],
    height: '0rpx',//当前页 swiper height
    currentNewsTypeIndex: 0,//切换前的current
    current: 0   //实时current
  },
  onLoad() {
    this.getNews(0)
  },
  navbtn_gn: function(event) {
    this.setData({
      current: 0
    })
  },
  navbtn_gj: function(event) {
    this.setData({
      current: 1
    })
  },
  navbtn_cj: function(event) {
    this.setData({
      current: 2
    })
  },
  navbtn_yl: function(event) {
    this.setData({
      current: 3
    })
  },
  navbtn_js: function(event) {
    this.setData({
      current: 4
    })
  },
  navbtn_ty: function(event) {
    this.setData({
      current: 5
    })
  },
  navbtn_other: function(event) {
    this.setData({
      current: 6
    })
  },
  onReachBottom() {
    this.getNews(this.data.currentNewsTypeIndex)
  },
  swiperChange: function(event) {
    console.log("swiper change")
    if (event.detail.source != "autoplay") {
    this.data.newstype[this.data.currentNewsTypeIndex].color = '#ffffff'
    this.data.newstype[event.detail.current].color = '#f6cb76'
    this.setData({
      newstype: this.data.newstype,
      currentNewsTypeIndex: event.detail.current
    })
      this.getNews(event.detail.current);
  }
},
contentSwiperFinish: function(event) {
  console.log("Swiper finish");
  
},
navigatToContent: function(event) {
  wx.navigateTo({
    url: '../../pages/news/new?id='+event.currentTarget.id
  })
},
getNews(index, callback) {
  wx.request({
    url: 'https://test-miniprogram.com/api/news/list',
    data: {
      type: this.data.newstype[index].type
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: res => {
      console.log("getNews success")
      let array = res.data.result
      console.log("getted array:",array)
      //处理字符串长度，防止超出范围
      for (var i = 0; i < array.length; ++i) {
        array[i].title = array[i].title.slice(0, 25) + "..."
        array[i].date = array[i].date.slice(0, 10)
      }
      this.data.newstype[index].news = array


      this.data.newstype[index].height = 414 + 193 * this.data.newstype[index].news.length - 2 + 100
      this.data.height = this.data.newstype[index].height
      this.setData({
        newstype: this.data.newstype,
        height: this.data.height
      })
      callback && callback()
    }
  })
}
})
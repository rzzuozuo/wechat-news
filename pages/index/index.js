//index.js
Page({
  data: {
    newstype: [{
        id: 0,
        text: '国内',
        type: "gn",
        news: [],
        height: '0',
        color: '#f6cb76'
      },
      {
        id: 1,
        text: '国际',
        type: "gj",
        news: [],
        height: '0',
        color: '#ffffff'
      },
      {
        id: 2,
        text: '财经',
        type: 'cj',
        news: [],
        height: '0',
        color: '#ffffff'
      }, {
        id: 3,
        text: '娱乐',
        type: 'yl',
        news: [],
        height: '0',
        color: '#ffffff'
      }, {
        id: 4,
        text: '军事',
        type: 'js',
        news: [],
        height: '0',
        color: '#ffffff'
      }, {
        id: 5,
        text: '体育',
        type: 'ty',
        news: [],
        height: '0',
        color: '#ffffff'
      }, {
        id: 6,
        text: '其他',
        type: 'other',
        news: [],
        height: '0',
        color: '#ffffff'
      }
    ],
    height: '0rpx', //当前页 swiper height
    currentNewsTypeIndex: 0, //切换前的current
    current: 0 //实时current
  },
  onLoad() {
    this.getNews(0)
  },
  navbtn: function(event) {
    console.log("navbtn:", event)
    this.setData({
      current: event.currentTarget.id
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
      url: '../../pages/news/new?id=' + event.currentTarget.id
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
        console.log("getted array:", array)
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
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
    height: '2000rpx',
    currentNewsTypeIndex: 0
  },
  onLoad() {
    this.getNews(0)
  },
  onReachBottom() {
    this.getNews(this.data.currentNewsTypeIndex)

  },
  contentSwiperFinish: function(event) {
    console.log("Swiper finish");
    this.data.newstype[this.data.currentNewsTypeIndex].color = '#ffffff'
    this.data.newstype[event.detail.current].color = '#f6cb76'
    this.setData({
      newstype:this.data.newstype,
      currentNewsTypeIndex: event.detail.current
    })
    this.getNews(event.detail.current);
  },
  navigatToContent: function(event){
    wx.navigateTo({
      url: '../../pages/news/new'
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
        console.log(array)
        //处理字符串长度，防止超出范围
        for (var i = 0; i < array.length; ++i) {
          array[i].title = array[i].title.slice(0, 25) + "..."
          array[i].date = array[i].date.slice(0, 10)
        }
        this.data.newstype[index].news = array


        this.data.newstype[index].height = 414 + 193 * this.data.newstype[index].news.length - 2 + 100 + "rpx"
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
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
        type: 'other'
      }
    ],
    gnnewsArray: [],
    gjnewsArray: [],
    cjnewsArray: [],
    ylnewsArray: [],
    jsnewsArray: [],
    tynewsArray: [],
    othernewsArray: [],
    newsArray: [],
    height: "2000rpx",
    currentNewsTypeIndex: 0
  },
  onLoad() {
    this.getNews(0)
  },
  onReachBottom() {
    this.getNews(this.data.currentNewsTypeIndex)
  },
  contentSwiperFinish: function(event) {
    console.log("animationfinish");
    this.setData({
      currentNewsTypeIndex: event.detail.current
    })
    console.log("currentNewArrayLenght", this.data.newsArray[this.data.currentNewsTypeIndex].length)
    this.getNews(event.detail.current);
  },
  getNews(index, callback) {
    console.log("getNews index:", index)
    console.log("request new type:", this.data.newstype[index].type)
    wx.request({
        url: 'https://test-miniprogram.com/api/news/list', 
        data: {
          type: this.data.newstype[index].type
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {

          let array = res.data.result
          console.log("old array:", array)
          //处理字符串长度，防止超出范围
          for (var i = 0; i < array.length; ++i) {
            array[i].title = array[i].title.slice(0, 25) + "..."
            array[i].date = array[i].date.slice(0, 10)
          }
          switch (this.data.newstype[index].type) {
            case 'gn':
              this.data.gnnewsArray = array
              break;
            case 'gj':
              this.data.gjnewsArray = array
              break;
          }
          
        this.setData({
          newsArray: array
        })
        this.data.height = 414 + 193 * this.data.newsArray.length - 2 + 100
        this.setData({
          height: this.data.height + 'rpx'
        })
        console.log(this.data.newsArray)
        callback && callback()
      }
    })
}
})
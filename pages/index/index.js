//index.js
Page({
  data: {
    newstype: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    news: [{
        id: 0,
        state_hot: false,
        title: "谢敏尔：拥抱新时代 践行新思想 实现新作为0",
        source: "人民日报0",
        time: "04:01",
        image_list_url: "/images/news_07.gif",
        image_first_url: "/images/news_03.gif"
      },
      {
        id: 1,
        state_hot: true,
        title: "谢敏尔：拥抱新时代 践行新思想 实现新作为1",
        source: "人民日报1",
        time: "04:02",
                image_list_url: "/images/news_09.gif",
        image_first_url: "/images/news_03.gif"
      },
      {
        id: 2,
        state_hot: false,
        title: "谢敏尔：拥抱新时代 践行新思想 实现新作为2",
        source: "人民日报2",
        time: "04:03",
        image_list_url: "/images/news_11.gif",
        image_first_url: "/images/news_03.gif"
      },
      {
        id: 3,
        state_hot: false,
        title: "谢敏尔：拥抱新时代 践行新思想 实现新作为3",
        source: "人民日报3",
        time: "04:04",
        image_list_url: "/images/news_13.png",
        image_first_url: "/images/news_03.gif"
      }
    ],
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
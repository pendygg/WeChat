//练习“映射”
const countryMap = {
  '中国': 'cn',
  '台湾': 'tw',
  '香港': 'hk',
  '日本': 'jp',
  '美国': 'us',
  '法国': 'fr',
  '英国': 'gb'
}

const countryColorMap = {
  '中国': '#a80d2a',
  '台湾': '#86C166',
  '香港': '#FF7F50',
  '日本': '#714C99',
  '美国': '#0066cc',
  '法国': '#0099ff',
  '英国': '#B9824D'
}

Page({
  data: {
    newsItem : [],
    newsCountry : ['中国', '台湾', '香港', '日本', '美国', '法国', '英国'],
    currentCountry : '日本',
    menuColor: '#714C99'//初始值：日本紫
  },

  onLoad: function() {
    this.getNews(this.data.currentCountry)
    this.setColor(this.data.currentCountry)
  },

  onPullDownRefresh: function () {
    this.getNews(this.data.currentCountry, () => { wx.stopPullDownRefresh() })
  },
  
  onTapCountry(e) {
    //获取国家名
    let country = e.currentTarget.id
    this.setData({
      currentCountry: country
    })
    //显示Toast
    wx.showToast({
      title: country,
    })
    //获取新闻，更改颜色
    this.getNews(country)
    this.setColor(country)
  },

  getNews(country, callback) {
    var that = this

    wx.request({
      url: 'https://newsapi.org/v2/top-headlines',
      
      data: {
        country: countryMap[country],
        apiKey: '585bb238bef74dbdb5ad901a816ae707'
      },
      
      success: function(res) {
        let result = res.data
        console.log(result)
        that.setNews(result)
      },
      
      complete: function() {
        callback && callback()
      }
    })
  },

  setNews(res) {
    let result = res.articles
    let newsItem = []
    for (let i = 0; i < res.totalResults; i++) {
      newsItem.push({
        newsTitle: result[i].title,//标题
        newsAuthor: result[i].author == null ? '' : result[i].author,//作者
        newsTime: result[i].publishedAt.substr(0, 10),//日期
        newsImage: result[i].urlToImage == null || result[i].urlToImage == '' ?
         '/image/default_image.jpg' : result[i].urlToImage,//图片
        newsNo: i//编号
      })
    }
    this.setData({
      newsItem: newsItem
    })
  },

  setColor(countryName) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: countryColorMap[countryName],
      // animation: {
      //   duration: 400,
      //   timingFunc: 'easeIn'
      // }
    })
    //设置菜单栏颜色
    this.setData({
      menuColor: countryColorMap[countryName]
    })
  },

  onTapWebNews(e) {
    let str = e.currentTarget.id
    //console.log(str)
    wx.navigateTo({
      url: '/pages/webNews/webNews?newsNo=' + str + '&country=' + this.data.currentCountry,
    })
  }
})
 
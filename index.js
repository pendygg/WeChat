const countryMap = {
  '中国' : 'cn',
  '台湾' : 'tw',
  '香港' : 'hk',
  '日本' : 'jp',
  '美国' : 'us',
  '法国' : 'fr',
  '英国' : 'uk'
}

const countryColorMap = {
  '中国' : '#de2910',
  '台湾' : '#86C166',
  '香港' : '#c8102e',
  '日本' : '#714C99',
  '美国' : '#0066cc',
  '法国' : '#002395',
  '英国' : '#FFF'
}

Page({
  data: {
    newsItem : [],
    newsCountry : ['中国', '台湾', '香港', '日本', '美国', '法国', '英国']
  },

  onLoad: function() {
    this.getNews()
  },

  onPullDownRefresh: function () {
    this.getNews(() => { wx.stopPullDownRefresh() })
  },

  getNews(callback) {
    var that = this
    var countryName = '台湾'

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: countryColorMap[countryName],
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    wx.request({
      url: 'https://newsapi.org/v2/top-headlines',
      
      data: {
        country: countryMap[countryName],
        apiKey: '585bb238bef74dbdb5ad901a816ae707'
      },
      
      success: function(res) {
        let result = res.data.articles
        console.log(result)
        
        let newsItem = []
        for (let i = 0; i < 20; i++) {
          newsItem.push({
            newsTitle: result[i].title,
            newsAuthor: result[i].author == null ? '' : result[i].author,
            newsTime: result[i].publishedAt.substr(0, 10),
            newsImage: result[i].urlToImage
          })
        }
        that.setData({
          newsItem: newsItem
        })
      },
      
      complete: function() {
        callback && callback()
      }
    })
  }
})

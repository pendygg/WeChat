const countryMap = {
  '中国': 'cn',
  '台湾': 'tw',
  '香港': 'hk',
  '日本': 'jp',
  '美国': 'us',
  '法国': 'fr',
  '英国': 'gb'
}

// pages/webNews/webNews.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsNo: -1,
    newsTitle: '',//标题
    newsAuthor: '',//作者
    newsTime: '',//日期
    newsImage: '',//图片
    newsUrl: '',//网址
    newsText: '',//详细
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.newsNo)
    this.setData({
      newsNo: options.newsNo
    })
    this.getNews(options.country)
  },

  getNews(country, callback) {
    var that = this

    wx.request({
      url: 'https://newsapi.org/v2/top-headlines',

      data: {
        country: countryMap[country],
        apiKey: '585bb238bef74dbdb5ad901a816ae707'
      },

      success: function (res) {
        let result = res.data.articles
        //console.log(result)
        that.setNews(result[that.data.newsNo])
      },

      complete: function () {
        callback && callback()
      }
    })
  },

  setNews(result) {
    this.setData({
      newsTitle: result.title,//标题
      newsAuthor: result.author == null ? '' : result.author,//作者
      newsTime: result.publishedAt.substr(0, 10),//日期
      newsImage: result.urlToImage == null || result.urlToImage == '' ?
        '/image/default_image.jpg' : result.urlToImage,//图片
      newsUrl: result.url == null ? '' : result.url,//网址
      newsText: result.description == null ? '' : result.description,//详细
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
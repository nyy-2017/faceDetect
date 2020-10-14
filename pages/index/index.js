// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "../../images/img1.png",
      "../../images/img2.png"
    ]
  },

  //本地图片
  bendi() {
    wx.navigateTo({
      url: '../canvas/canvas',
    })
  },
  // 微信图像
  weixin() {
    wx.navigateTo({
      url: '../canvas2/canvas2',
    })
  },
  //第一步设置可被分享
  onShareAppMessage:function(res){
    return {title:'我是传统分享的标题'}
  },
  //第二步： 设置分享到朋友圈的标题
  onShareTimeline:function(res){
    return {
      title: "转发到朋友圈",
      query: "我是携带的参数"
    }
  }
})
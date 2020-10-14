//编程小石头微信：2501902696
const ctx = wx.createCanvasContext('shareImg')
Page({
  //把相框盖在头像上面，并用canvas画出来
  drawImg(index) {
    let that = this;
    wx.showLoading({
      title: '努力生成中...'
    })
    let promise1 = new Promise(function(resolve, reject) {
      wx.getImageInfo({
        src: "../../images/xiaoshitou.jpg",
        success: function(res) {
          console.log("promise1", res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function(resolve, reject) {
      wx.getImageInfo({
        src: `../../images/head${index}.png`,
        success: function(res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    Promise.all([
      promise1, promise2
    ]).then(res => {
      console.log("Promise.all", res)
      //主要就是计算好各个图文的位置
      let num = 1125;
      ctx.drawImage('../../'+res[0].path, 0, 0, num, num)
      ctx.drawImage('../../' + res[1].path, 0, 0, num, num)
      ctx.stroke()
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: num,
          height: num,
          destWidth: num,
          destHeight: num,
          canvasId: 'shareImg',
          success: function(res) {
            that.setData({
              prurl: res.tempFilePath
            })
            wx.hideLoading()
          },
          fail: function(res) {
            wx.hideLoading()
          }
        })
      })
    })
  },

  //生成头像
  shengcheng: function(e) {
    let index = e.currentTarget.dataset.k
    this.drawImg(index);
  },

  //保存到相册
  save: function() {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      }
    })

  }
})
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '/assets/background.jpg',
    showTips: false,
    beauty:null
  },

  getImage: function (type) {
    const _this = this
    // 取消之前的结果显示
    _this.setData({ beauty: null });
    wx.chooseImage({
      count: 1,
      sourceType: [type],
      success: function (res) {
        // res.tempFiles 是一个数组，数组的每一项都是一个对象，包括照片的大小和照片的路径
        console.log(res.tempFiles)
        _this.setData({ img: res.tempFiles[0].path })
        // loading
        wx.showLoading({ title: '分析中...' });
        wx.uploadFile({
          url: 'https://ai.qq.com/cgi-bin/appdemo_detectface',
          filePath: res.tempFiles[0].path,
          name: 'image_file',
          success: function (res) {
            const obj = JSON.parse(res.data);
            console.log("res", obj);
            if (obj.ret === 0){
              console.log(obj.data.face[0].gender);
              console.log(obj.data.face[0].age);
              console.log(obj.data.face[0].expression);
              console.log(obj.data.face[0].beauty);
              _this.setData({ beauty: obj.data.face[0] });
              // if (obj.data.face[0].gender >50){
              // }else{
              // }
            }else{
              // 检测失败
              wx.showToast({ icon: 'none', title: '找不到你的小脸蛋喽～' })
            }
            // end loading
            wx.hideLoading();
          }
        })
      }
    })
  },

  handleClick(e) {
    if (e.type === 'tap') {
      // 短按则拍照
      this.getImage('camera')
    } else if (e.type === 'longtap') {
      // 长按则选择照片
      this.getImage('album')
    }
  },

/**
 * 用户点击右上角分享
 */
onShareAppMessage() {
  if (!this.data.beauty) return
  // 如果有分析结果，则分享
  return { title: `刚刚测了我的颜值「${this.data.beauty.beauty}」你也赶紧来试试吧！` }
}




})


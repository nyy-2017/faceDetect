// pages/persons.js
//获取应用实例
const app = getApp();
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var demo = new QQMapWX({
  key: 'OV5BZ-AFAHJ-3VIFG-FJJOL-IQEHO-EZBIS',//'申请的开发者密钥' // 必填
});

Page({
  data: {
    tempFilePaths: '',
    nickName: '', // 用户名称
    userInfoAvatar: '', // 用户图像url地址
    sex: '', //性别
    country: "", //地区
    province: '', // 省份
    city: '', // 城市
    provinceCity:'', //地址
    items: [
      { name: '男', value: '1' },
      { name: '女', value: '2', checked: 'true' },
      { name: '保密', value: '0' }
    ]
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          userInfoAvatar: res.tempFilePaths
        })
      },
      radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
      },
    })
  },
  onLoad: function () {
    var that = this;
    //用户信息
    wx.getUserInfo({
      success: function (res) {
        // success
        // console.log("onLoad:", res, res.userInfo);
        that.setData({
          nickName: res.userInfo.nickName, //用户名称
          userInfoAvatar: res.userInfo.avatarUrl, //用户图像url
          country: res.userInfo.country, //地区
          province: res.userInfo.province, //用户省份
          city: res.userInfo.city, //用户城市
          provinceCity: res.userInfo.province + res.userInfo.city
        })
        //用户性别回显
        for (let i = 0; i < that.data.items.length; i++) {
          if (that.data.items[i].value == res.userInfo.gender){
            that.data.items[i].checked = true;
            that.setData({
              items: that.data.items
            })
          } else{
            that.data.items[i].checked = false;
            that.setData({
              items: that.data.items
            })
          } 
        }
      },
      fail: function () {
        // fail
        console.log("获取失败！")
      },
      complete: function () {
        // complete
        console.log("获取用户信息完成！")
      }
    })
    //用户位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log("用户位置:", res);
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            // console.log("result:", res.result);
            that.setData({
              country: res.result.address_component.nation,
              provinceCity: res.result.address
            })
          }
        })
      },
      // fail
      fail() {
        wx.showModal({
          title: '提醒',
          content: '您拒绝了位置授权，将无法使用大部分功能，点击确定重新获取授权',
          success(res) {
            console.log("res1111", res)
            //如果点击确定
            if (res.confirm) {
              console.log("res2222", res)
              wx.openSetting({
                success(res) {
                  //如果同意了位置授权则userLocation=true
                  if (res.authSetting["scope.userLocation"]) {
                    that.onLoad();
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
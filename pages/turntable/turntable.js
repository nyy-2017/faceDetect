//turntable.js
Page({
 data: {
  circleList: [], //圆点数组
  awardList: [], //奖品数组
  colorCircleFirst: '#FFDF2F', //圆点颜色1
  colorCircleSecond: '#FE4D32', //圆点颜色2
  colorAwardDefault: '#F5F0FC', //奖品默认颜色
  colorAwardSelect: '#ffe400', //奖品选中颜色
  indexSelect: 0, //被选中的奖品index
  isRunning: false, //是否正在抽奖
  imageAward: [
   '../../assets/img/1.png',
   '../../assets/img/2.png',
   '../../assets/img/3.png',
   '../../assets/img/4.png',
   '../../assets/img/5.png',
   '../../assets/img/6.png',
   '../../assets/img/8.png',
   '../../assets/img/10.png'
  ], //奖品图片数组
  jifenNums: [
   '1积分',
   '2积分',
   '3积分',
   '4积分',
   '5积分',
   '6积分',
   '7积分',
   '8积分',
   '0积分'
  ], //奖品图片数组
 },

 onLoad: function() {
  var _this = this;
  //圆点设置
  var leftCircle = 7.5;
  var topCircle = 7.5;
  var circleList = [];
  for (var i = 0; i < 24; i++) {
   if (i == 0) {
    topCircle = 15;
    leftCircle = 15;
   } else if (i < 6) {
    topCircle = 7.5;
    leftCircle = leftCircle + 102.5;
   } else if (i == 6) {
    topCircle = 15
    leftCircle = 620;
   } else if (i < 12) {
    topCircle = topCircle + 94;
    leftCircle = 620;
   } else if (i == 12) {
    topCircle = 565;
    leftCircle = 620;
   } else if (i < 18) {
    topCircle = 570;
    leftCircle = leftCircle - 102.5;
   } else if (i == 18) {
    topCircle = 565;
    leftCircle = 15;
   } else if (i < 24) {
    topCircle = topCircle - 94;
    leftCircle = 7.5;
   } else {
    return
   }
   circleList.push({
    topCircle: topCircle,
    leftCircle: leftCircle
   });
  }
  this.setData({
   circleList: circleList
  })

  //圆点闪烁
  setInterval(function() {
   if (_this.data.colorCircleFirst == '#FFDF2F') {
    _this.setData({
     colorCircleFirst: '#FE4D32',
     colorCircleSecond: '#FFDF2F',
    })
   } else {
    _this.setData({
     colorCircleFirst: '#FFDF2F',
     colorCircleSecond: '#FE4D32',
    })
   }
  }, 500) //设置圆点闪烁的效果

  //奖品item设置
  var awardList = [];
  //间距,怎么顺眼怎么设置吧.
  var topAward = 25;
  var leftAward = 25;
  for (var j = 0; j < 8; j++) {
   if (j == 0) {
    topAward = 25;
    leftAward = 25;
   } else if (j < 3) {
    topAward = topAward;
    //166.6666是宽.15是间距.下同
    leftAward = leftAward + 166.6666 + 15;
   } else if (j < 5) {
    leftAward = leftAward;
    //150是高,15是间距,下同
    topAward = topAward + 150 + 15;
   } else if (j < 7) {
    leftAward = leftAward - 166.6666 - 15;
    topAward = topAward;
   } else if (j < 8) {
    leftAward = leftAward;
    topAward = topAward - 150 - 15;
   }
   var imageAward = this.data.imageAward[j];
   awardList.push({
    topAward: topAward,
    leftAward: leftAward,
    imageAward: imageAward
   });
  }
  this.setData({
   awardList: awardList
  })
 },

 //开始抽奖
 startGame: function() {
  if (this.data.isRunning) return
  this.setData({
   isRunning: true
  })
  var _this = this;
  var indexSelect = 0
  var i = 0;
  var timer = setInterval(function() {
   indexSelect++;
   //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
   let randomNum = Math.floor(Math.random() * 10) * 10; //可均衡获取0到90的随机整数
   i += randomNum;
   if (i > 300) {
    //去除循环
    clearInterval(timer)
    //获奖提示
    let jifen = 1;
    let selectNum = _this.data.indexSelect
    console.log("选号：" + selectNum );
    if (selectNum===0) {
     jifen = 2;
    } else if (selectNum === 1) {
     jifen = 3;
    }  else if (selectNum === 2) {
     jifen = 4;
    }  else if (selectNum === 3) {
     jifen = 5;
    } else if(selectNum === 4) {
     jifen = 6;
    } else if(selectNum === 5) {
     jifen = 8;
    } else if (selectNum === 6) {
     jifen = 10;
    }
    wx.showModal({
     title: '恭喜您',
     content: '获得了' + jifen + "积分",
     showCancel: false, //去掉取消按钮
     success: function(res) {
      if (res.confirm) {
       _this.setData({
        isRunning: false
       })
      }
     }
    })
   }
   indexSelect = indexSelect % 8;
   _this.setData({
    indexSelect: indexSelect
   })
  }, (200 + i))
 }
})
// pages/user-teainfo/user-teainfo.js
// 调用接口由数据库获取老师信息，其中包括老师头像，自我介绍，年龄，昵称，手机号
//接口返回json文件然后将其对象化成为一个数组
// var tea_info=
// this.setData(
//   {tea_info:tea_info}
// )
import {Config} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id');
    var that = this;
    wx.request({
      url: Config.baseUrl, //开发者服务器中转接口
      data: {
        c: 'WxLoadStuPersonal',
        a: 'loadTeaInfo',
        tea_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        console.log(res.data)
        var obj = res.data;
        that.setData({
          tea_info: obj
        })
      }//res.data是开发者服务器传回来的数据,
      //res.statusCode是开发者服务器状态码
    })
  },
})
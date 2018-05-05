// pages/user-stu/user-stu.js
//调用接口根据该老师的id获取该老师的学生的信息，其中包括学生头像URL，学生名字，学生所选课程，学生联系方式
//var stu_info=
//this.setData()
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
        c: 'WxLoadTeaPersonal',
        a: 'loadTeaStuList',
        tea_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
         
        var obj = JSON.parse(res.data);
       console.log(obj)
        that.setData({
          teastu_info: obj
        })
      }//res.data是开发者服务器传回来的数据,
      //res.statusCode是开发者服务器状态码
    })


  },
  onTeaStu:function(event){
    var that = this;
  console.log(event)
  var stu_id = event.currentTarget.dataset.stu_id
  var class_id= event.currentTarget.dataset.class_id
  wx.navigateTo({
    url: '/pages/evaluate/evaluate?class_id='+class_id+'&stu_id='+stu_id,
  })
  }
})
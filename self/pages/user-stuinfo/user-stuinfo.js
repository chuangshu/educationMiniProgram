// pages/user-stuinfo/user-stuinfo.js
// 调用接口由数据库获取学生信息，其中包括学生头像url，名字，年龄，性别，手机号，年级
//接口返回json文件然后将其对象化成为一个数组
// var stu_info=
// this.setData(
//   {stu_info:stu_info}
// )

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
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
      data: {
        c: 'WxLoadStuPersonal',
        a: 'loadStuInfo',
        stu_id: id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        console.log(res)
        var obj = JSON.parse(res.data);
        that.setData({
          stu_info:obj
        })
      }//res.data是开发者服务器传回来的数据,
      //res.statusCode是开发者服务器状态码
    })
  },
})
import { Config } from './utils/config.js';

var globalData = require('./glodata.js')//index.js
var openid = '';
App({
  onLaunch: function () {
    //--------------------------getOpenId----------------------------------------------------
    var that = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};//从缓存中读取用户信息，若没有则请求
    //  if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
    //把if语句注释掉是因为在测试时会从缓存读取，不能测试接口
    wx.login({
      success: function (res) {
        //console.log(res);
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              var objz = {};
              objz.avatarUrl = res.userInfo.avatarUrl;
              objz.nickName = res.userInfo.nickName;
              //console.log(res.code);  
              wx.setStorageSync('userInfo', objz);//存储userInfo  
            }
          });
          wx.request({
            url: Config.loginUrl,
            data: {
              appid: globalData.globalData.appid,//需要glodata.js
              secret: globalData.globalData.secert,
              js_code: res.code,
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
            // header: {}, // 设置请求的 header    
            success: function (res) {
              console.log(res.data);//data里面是微信api返回的session_key、openid，json格式的字符串
              var obj = JSON.parse(res.data);//将json格式对象化
              //obj.openid 获取的openid
              // obj.expires_in = Date.now() + res.data.expires_in;//存进缓存中，用于在if中判断是否过期
              // console.log('12300');
              console.log(obj.openid);
              wx.setStorageSync('openid', obj.openid);
              wx.setStorageSync('type', obj.type);//存储openid+密钥，其实不安全
              if ('1' == obj.type) {
                wx.setStorageSync('id', obj.stu_id);//学生
              } else if ('2' == obj.type) {
                wx.setStorageSync('id', obj.tea_id);//已通过的老师
              } else if ('-1' == obj.type) {
                wx.setStorageSync('id', obj.tea_id);//审核中的老师
              } else {
                wx.setStorageSync('id', '');
              }

              wx.setStorageSync('process', '1');
              console.log("set process 1");
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    //将初始退出状态设为是
    wx.setStorage({
      key: 'exit',
      data: 1,
    })
    //  }
    //--------------------------getOpenId----------------------------------------------------
    openid = wx.getStorageSync('openid');
    // console.log(openid);
    wx.setStorageSync('exit', 1);
  },
  data: {
    "path": "pages/user/user",
  },
  globalData: {
    userInfo: null,
  }
})
module.exports = {
  openid: openid
}
// pages/teacherList/teacherList.js
import {Config} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // "teacherList": [
    //   {
    //     "teacherImg": "/pages/images/teacher.png",
    //     "name": "徐景莉",
    //     "gender": "女",
    //     "description": "讲课风格风趣幽默，生动形象。讲课风格：风趣幽默，生动形象。讲课风格：风趣幽",
    //     "teacherId": 0
    //   },
    //   {
    //     "teacherImg": "/pages/images/sister.png",
    //     "name": "LTT",
    //     "gender": "女",
    //     "description": "讲课风格风趣幽默，生动形象。讲课风格：风趣幽默，生动形象。讲课风格：风趣幽",
    //     "teacherId": 1,
    //   }

    // ]
  },
  onLoad: function () {
    var that = this;
    var teacherList = []
    wx.request({
      url: Config.baseUrl,

      data: {//加载全部老师的列表
        c: 'WxLoadCls',
        a: 'loadPassTea'
      },
      method: 'GET', // 

      success: function (res) {
        console.log(res)
        //console.log(res['data']);

        var tea_List = res.data;
        //console.log(tea_List);
        for (var idx in tea_List) {
          var teacherId = tea_List[idx].tea_id;
          var teacherImg = tea_List[idx].tea_photo_url;
          var name = tea_List[idx].tea_name;
          var gender = tea_List[idx].tea_gender;
          var description = tea_List[idx].self_introduction;
          if (description.length >= 10) {
            description = description.substring(0, 10) + "..."
          }
          var teacher = {
            teacherId: teacherId,
            teacherImg: teacherImg,
            name: name,
            gender: gender,
            description: description
          }
          teacherList.push(teacher)
        };

        that.setData(
          {
            teacherList: teacherList
          }
        )

      }
    });

  },
  onteacherDetail: function (event) {
    var teacherId = event.currentTarget.dataset.teacherid;
    console.log(teacherId);
    wx.navigateTo({
      url: '/pages/teacherDetail/teacherDetail?teacherId=' + teacherId,
    })
  }
  ,
  onSearchTap: function (event) {
    wx.navigateTo({
      url: '/pages/search/search',
    });
  }
})

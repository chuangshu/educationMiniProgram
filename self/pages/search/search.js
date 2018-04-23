Page({

  /**
   * 页面的初始数据
   */
  data: {
    "searchComfirm": false,
    isExist: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onSearch: function (event) {
    // this.setData({
    //   "searchComfirm": true
    // })
    var that = this;
    var value = event.detail.value
    console.log(value);
    var postData = {
      c: 'WxSearch',
      a: 'TeaSearch',
      name: value
    };
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
      data: postData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var teacherList = []
         var tea_List = JSON.parse(res.data)
        if (tea_List) {
          that.setData({
            isExist: 1
          })
         
          console.log(tea_List);
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
        } else {
          that.setData({
            isExist: -1
          })

        }
        that.setData({
          teacherList: teacherList
        })
      }
    })
  }
  ,
  onCancelImgTap: function (event) {
    wx.navigateBack();
  },
  onteacherDetail: function (event) {
    var teacherId = event.currentTarget.dataset.teacherid;
    console.log(teacherId);
    wx.navigateTo({
      url: '/pages/teacherDetail/teacherDetail?teacherId=' + teacherId,
    })
  }
})
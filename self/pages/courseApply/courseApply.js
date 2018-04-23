Page({
  data: {
    array: ['上门辅导', '店铺辅导'],
    multiArray: [
      ['小学', '初中', "高中", "大学"],
      ['一年级', '二年级', '三年级', '四年级', '五年级', "六年级"]
    ],
    index: 0,
    time: '12:01',
    multiIndex: [0, 0],
    imgSrc: "../images/chooseImg.png",
    subjects: [
      '语文',
      '数学',
      '英语',
      '政治',
      '音乐',
      '美术',
      '其他'
    ],
    subject: "请选择课程名称",
    tea_id: ''
  },
  formSubmit: function (e) {
    wx.showLoading(
      {
        title: '发送中',
      }
    );
    var postData = {};
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var subject = e.detail.value.subject;
    var count = e.detail.value.count;
    var time = e.detail.value.time;
    var demo_limit = e.detail.value.demo_limit;
    var method;
    var stage = this.data.multiArray[0][e.detail.value.grade[0]];
    var g_class = this.data.multiArray[1][e.detail.value.grade[1]];
    var description = e.detail.value.description;
    var class_photo = '';
    //更改辅导方式的值
    if (e.detail.value.method == 0) {
      method = -1;
    } else {
      method = 1
    }
    postData = {
      c: 'WxLoadTeaPersonal',
      a: 'teaAddCls',//老师在“我的课程”界面里点击按钮添加课程，等待赞叔审核
      tea_id: this.data.tea_id,//
      class_time: time,
      method: method,//-1为上门，1为到店 注意不能传0！
      number_limit: count,
      grade: stage + g_class,//传入的参数要规格化 小学一年级 初中一年级 高中一年级
      subject: subject,//传入的参数要规格化 语文 数学 英语
      class_photo: class_photo,
      class_introduction: description,
      demo_limit: demo_limit
    }
    console.log(postData);
    //先上传图片，获取图片外网地址
    wx.uploadFile({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/uploadimg/upload_file.php',
      filePath: this.data.imgSrc,
      name: 'file',
      success: function (res) {
        var resultData = JSON.parse(res.data);
        console.log(resultData.photo_url)
        var data = resultData.photo_url;//返回图片服务器地址

        postData.class_photo = data;//将图片外网地址加入到postData中
        //发送注册数据postData到后台
        wx.request({
          url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
          data: postData,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading();
            var status = JSON.parse(res.data).status
            if(status){
             wx.hideLoading();
                  wx.showModal({
                    title: '发布成功，课程待审核',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack();
                      }
                    }
                  })
                } else {
                  wx.hideLoading();
                  wx.showModal({
                    title: '发布失败',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack();
                      }
                    }
                  })
                }
          }
        })

        console.log(postData)

      }
    })


  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ['一年级', '二年级', '三年级', '四年级', '五年级', "六年级"];

        break;
      case 1:
        data.multiArray[1] = ['一年级', '二年级', '三年级'];

        break;
      case 2:
        data.multiArray[1] = ['一年级', '二年级', '三年级'];

        break;
      case 3:
        data.multiArray[1] = ['一年级', '二年级', '三年级', '四年级'];

        break;
    }

    this.setData(data);
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }

  ,
  onChooseImage: function (event) {
    console.log("点击了选取照片事件")
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          imgSrc: tempFilePaths
        });
        that.data.imgSrc = tempFilePaths;
        console.log(that.data.imgSrc)
      }
    })
  }
  ,
  onLoad: function (options) {
    this.data.tea_id = options.tea_id;
  }
  ,
  subjectChange: function (e) {

    if (e.detail.value == 0) {
      this.data.postData.subject = ''
      var subject = this.data.subjects[e.detail.value]

    }
    else {
      var subject = this.data.subjects[e.detail.value]

      console.log(subject);
    }
    this.setData(
      { subject: subject }
    );
  }
})

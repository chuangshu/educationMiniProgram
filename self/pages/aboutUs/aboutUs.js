Page({
  data: {
    synopsis: "“慧学慧教”平台是根据新时代“互联网+”的新型教育模式，采取线上和线下相结合的O2O模式，在平台上会查看到教学基地老师的自主发布的简历和以往受教学生的评分。一方面，平台为需求者提供了丰富、全面、及时的产品及服务信息，学生和家长也能够通过平台主动与老师沟通联系，使需求者能够更加快捷地订购适宜的产品和服务。另一方面，平台实行“学生—教师评分反馈机制”，受教的学生可以对相应的老师进行评分，使家长在选择老师培养小孩的时候有一定的参考意见，不仅能够提高师生匹配效率，而且能为家教市场师资规范起到良好的作用。欢迎广大大学生及老师参与平台，为更多有需要的学子服务。",
    markers: [{
      iconPath: "/pages/images/map-maker.png",
      id: 0,
      latitude: 22.24628,
      longitude: 113.52911,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.53138,
        latitude: 22.25472
      }, {
          longitude: 113.53138,
          latitude: 22.25472
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  }
})
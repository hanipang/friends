// 顶部操作列表
// 收藏

// 添加

// 下载

// 删除
var delIndex
$('#del').click(function () {
  var n = $('.list .content input:checked').length
  singerInformation.splice(delIndex - 1, n)
  $('.content').remove()
  newList()
  $('.list .content input:checked').parent().parent().remove()
  if ($('.content input').length == 0) {
    $('.caption input').prop('disabled', true).prop('checked', false)
  }
})

// 清空
$('#delAll').click(function () {
  $('.list .content').remove()
  if ($('.content input').length == 0) {
    $('.caption input').prop('disabled', true).prop('checked', false)
  }
})

// 播放列表
// 根据数据创建列表
// 数据
var singerInformation = [{
    songname: '《稻香》',
    singer: '周杰伦',
    singer_player_album: '《魔杰座》',
    time: '03:43'
  },
  {
    songname: '《夜曲》',
    singer: '周杰伦',
    singer_player_album: '《十一月的肖邦》',
    time: '03:51'
  },
  {
    songname: '《可爱女人》',
    singer: '周杰伦',
    singer_player_album: '《Jay》',
    time: '03:58'
  },
  {
    songname: '《发如雪》',
    singer: '周杰伦',
    singer_player_album: '《十一月的萧邦》',
    time: '05:02'
  },
  {
    songname: '《千里之外》',
    singer: '周杰伦',
    singer_player_album: '《依然范特西》',
    time: '04:16'
  },
  {
    songname: '七里香',
    singer: '周杰伦',
    singer_player_album: '《七里香》',
    time: '04:59'
  },
  {
    songname: '醉赤壁',
    singer: '林俊杰',
    singer_player_album: 'JJ陆',
    time: '04:38'
  },
  {
    songname: '背对背拥抱',
    singer: '林俊杰',
    singer_player_album: '100天',
    time: '03:54'
  },
  {
    songname: '她说《爱情睡醒了》电视剧插曲',
    singer: '林俊杰',
    singer_player_album: '她说 概念自选辑',
    time: '05:20'
  },
  {
    songname: '学猫叫',
    singer: '小潘潘/小峰峰',
    singer_player_album: '电影《下一任：前任》片尾曲',
    time: '03:29'
  }
]

// 创建列表
newList()

function newList() {
  for (var i = 0; i < singerInformation.length; i++) {
    $('<ul class="content">').html('<li><input type="checkbox"></li><li>' + (i + 1) + '</li><li>' + singerInformation[i].songname + '<span class="icon_list"><a href="javascript:;" class="iconfont play">&#xe610;</a><a href="javascript:;" class="iconfont">&#xe81b;</a><a href="javascript:;" class="iconfont">&#xe6f4;</a></span></li><li>' + singerInformation[i].singer + '</li><li>' + singerInformation[i].time + '</li></ul>').appendTo('.list')
  }

  // 显示隐藏播放按钮
  $('.list .content').mouseenter(function () {
    $(this).find('.icon_list').css('opacity', 1)
  })
  $('.list .content').mouseleave(function () {
    $(this).find('.icon_list').css('opacity', 0)
  })
}

// 点击播放
var play = true
var dsq, n
var oldIndex = 0
var that = 0
var index = 0
$('.list .content .play').click(function () {

  // 初始化进度条
  clearInterval(dsq)
  n = 0
  $('.bottom_fixed #play').html('&#xe66e;')
  $('.line .line_dot').css('left', 0)
  $('.line_top').css('display', 'none')
  $('.line .line_dot').css('left', 0)
  $(that).parent().parent().parent().children().eq(1).html(oldIndex)
  that = this

  // 切换播放
  $('.bottom_fixed #play').html('&#xe638;')

  // 初始化line_top内容
  $('.line_top').css('display', 'block')
  $('.line_top').children('.left').html('')
  $('.line_top').children('.right').html('')

  // 初始化音量
  for (var i = 0; i < $('.music_box audio').length; i++) {
    $('.music_box audio')[i].volume = 0
  }

  // 改变下面play值
  play = false

  // 改变num状态
  $(this).parent().parent().parent().children().eq(1).html('<div class="gif"></div>')

  // 进度条自动走
  // 获取时间
  index = $(this).parent().parent().parent().index()

  // 根据模式改变播放顺序
  // if ($('#play_mode').html() == '&#xe788;') {
  //   index = parseInt(Math.random() * singerInformation.length)
  // }
  // 播放音频

  $('.music_box audio')[index - 1].load()
  $('.music_box audio')[index - 1].play()
  // 停止音频

  if (oldIndex > 0) {
    $('.music_box audio')[oldIndex - 1].pause()
  }
  oldIndex = index
  var newTime = (((singerInformation[index - 1].time).split(':'))[0] - 0) * 60 + (((singerInformation[index - 1].time).split(':'))[1] - 0)

  // 获取进度条长度
  var len = $('.line').width()

  // 每秒走的长度
  var speed = len / newTime

  // 显示进度条上方信息
  $('.line_top').css('display', 'block')
  $('.line_top').children('.left').html(singerInformation[index - 1].songname + ' - ' + singerInformation[index - 1].singer)
  $('.line_top').children('.right').html('00:00' + ' / ' + singerInformation[index - 1].time)
  dsq = setInterval(function () {
    n++
    $('.line .line_dot').css('left', speed * n)

    // 如果时间结束，清空当前状态
    if (n == newTime) {
      clearInterval(dsq)
      n = 0
      $('.bottom_fixed #play').html('&#xe66e;')
      $('.line .line_dot').css('left', 0)
      $('.line_top').css('display', 'none')
      $('.singer_player_text').addClass('active')
    }

    // 把n的值换成时间格式
    if (n < 10) {
      a = '00:0' + n
    } else if (n < 60) {
      a = '00:' + n
    } else if (n == 60) {
      a = '01:00'
    } else if (n > 60) {
      var m = n % 60
      if (m < 10) {
        a = '0' + Math.floor(n / 60) + ':0' + m
      } else {
        a = '0' + Math.floor(n / 60) + ':' + m
      }
    }

    // 显示进度条上方信息
    $('.line_top').css('display', 'block')
    $('.line_top').children('.left').html(singerInformation[index - 1].songname + ' - ' + singerInformation[index - 1].singer)
    $('.line_top').children('.right').html(a + ' / ' + singerInformation[index - 1].time)
  }, 1000)

  // 改变右侧信息
  $('.singer_player_name').text('歌曲名：' + singerInformation[index - 1].songname)
  $('.singer_player_singer').text('歌手名：' + singerInformation[index - 1].singer)
  $('.singer_player_album').text('专辑名：' + singerInformation[index - 1].singer_player_album)
  $('.singer_player_img').attr('src','images/player-images/' + index + '.jpg')
  $('.bg_img').css('background','url(images/player-images/' + index + '.' + index + '.jpg) no-repeat').css('background-size','cover')

  // 右侧歌词轮播
  $('.singer_player_text').removeClass('active')
  var times = [0,5, 7,9, 14, 18, 22, 27,32,36, 40,47, 51,55,  65, 70, 76, 83, 92, 100, 105, 109, 113,120, 125,129,134, 138,141, 145,149, 153,157, 164, 168, 172, 175, 179, 184, 187, 190, 204, 208, 211, 215, 220, 225]
  var nth = 0
  for (var i = 0; i < times.length; i++) {
    var textTime = times[i] * 550
    window.setTimeout(function () {
      $('.singer_player_text div').eq(nth - 1).css('color','#666')
      $('.singer_player_text').css('top', -28 * nth)
      nth++
      $('.singer_player_text div').eq(nth - 1).css('color','#31c27c')
    }, textTime)
  }
})

// 全选
$('.caption input').click(function () {
  $('.content input').prop('checked', $(this).prop('checked'))
})

// 单选
$('.content input').click(function () {
  delIndex = $(this).parent().parent().index()
  if ($('.content input').length == $('.content input:checked').length) {
    $('.caption input').prop('checked', true)
  } else {
    $('.caption input').prop('checked', false)
  }
})

// 底部操作各项
// 上一曲
$('#prev').click(function(){
  $('.list .content .play').trigger('click')
})

// 播放暂停
$('#play').click(function () {
  if (play) {
    $(this).html('&#xe638;')
    play = false
    $('.list .content .play').trigger('click')
  } else {
    $(this).html('&#xe66e;')
    play = true
    clearInterval(dsq)
    if (oldIndex > 0) {
      $('.music_box audio')[oldIndex - 1].pause()
    }
  }
})

// 下一曲
$('#next').click(function(){
  $('.list .content .play').trigger('click')
})

// 播放进度条
$('.line .line_dot').mousedown(function (e) {
  var val = e.clientX
  var x = $(this).position().left
  document.onmousemove = function (e) {
    var x1 = e.clientX
    var m = x1 - val + x
    if (m < 0) {
      m = 0
    } else if (m >= $('.line').width()) {
      m = $('.line').width()
    }
    $('.line .line_dot').css('left', m)
  }
  $('html,body').mouseup(function () {
    document.onmousemove = function () {
      null
    }
  })
})

// 播放模式
var n = 0
$('#play_mode').click(function () {
  n++
  if (n == 1) {
    $(this).html('&#xe802;')
  } else if (n == 2) {
    $(this).html('&#xe66c;')
  } else if (n == 3) {
    $(this).html('&#xe66d;')
  } else if (n == 4) {
    $(this).html('&#xe788;')
    n = 0
  }
})

// 红心
var play_like = true
$('#play_like').click(function () {
  if (play_like) {
    $(this).html('&#xe63b;')
    play_like = false
  } else {
    $(this).html('&#xe6a3;')
    play_like = true
  }
})
// 下载

// 留言

// 纯净
var chunJing = true
$('#chunJing').click(function () {
  if (chunJing) {
    $(this).html('&#xe652;')
    chunJing = false
    $('.main_player').css('display', 'block')
    //$('.singer_player_showBox').removeClass('chunjing_mode').css('display', 'block')
  } else {
    $(this).html('&#xe655;')
    chunJing = true
    $('.main_player').css('display', 'none')
    //$('.singer_player_showBox').addClass('chunjing_mode').css('display', 'none')
  }
})

// 音量
var play_voice = true
$('#play_voice').click(function () {
  if (play_voice) {
    $(this).html('&#xe662;')
    play_voice = false
  } else {
    $(this).html('&#xe65e;')
    play_voice = true
  }
})

// 音量条
$('.voice_line .voice_dot').mousedown(function (e) {
  var val = e.clientX
  var x = $(this).position().left
  document.onmousemove = function (e) {
    var x1 = e.clientX
    var m = x1 - val + x
    if (m < 0) {
      m = 0
    } else if (m >= $('.voice_line').width()) {
      m = ('.voice_line').width()
    }
    $('.voice_line .voice_dot').css('left', m)
    if (m === 0) {
      $('#play_voice').html('&#xe65e;')
    } else {
      $('#play_voice').html('&#xe662;')
    }
    // 页面控制音量 audio.volume
    for (var i = 0; i < $('.music_box audio').length; i++) {
      $('.music_box audio')[index - 1].volume = m / $('.voice_line').width()
    }
  }
  $('html,body').mouseup(function () {
    document.onmousemove = function () {
      null
    }
  })
})
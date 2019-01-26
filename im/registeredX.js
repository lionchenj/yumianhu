var type, referee;
(function() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  type = theRequest.type;
  referee = theRequest.referee;
})();
//获取短信验证码
$(".getCode").on("click", function() {
  if ($(".getCode").html() != "获取验证码") {
    return;
  }
  setTime();
});
//倒数
var countdown = 60;
function setTime() {
  setTimeout(function() {
    if (countdown < 2) {
      $(".getCode").html("获取验证码");
      countdown = 60;
      clearTimeout();
      return;
    } else {
      countdown--;
      $(".getCode").html(countdown);
      setTime();
    }
  }, 1000);
}
//判断输入框
$(".reg_btn").on("click", function() {
  var mobile, verification_code, name, password, wechat_number;
  if ($(".name").val()) {
    name = $(".name").val();
  } else {
    $(".n_error").html("不能为空");
    return;
  }
  if ($(".mobile").val()) {
    mobile = $(".mobile").val();
  } else {
    $(".m_error").html("不能为空");
    return;
  }
  if ($(".code").val()) {
    verification_code = $(".code").val();
  } else {
    $(".c_error").html("不能为空");
    return;
  }
  if ($(".wechat").val()) {
    wechat_number = $(".wechat").val();
  } else {
    $(".w_error").html("不能为空");
    return;
  }
  // if ($(".mobileUp").val()) {
  //   referee = $(".mobileUp").val();
  // } else {
  //   $(".mu_error").html("不能为空");
  //   return;
  // }
  if ($(".password").val()) {
    password = $(".password").val();
  } else {
    $(".p_error").html("不能为空");
    return;
  }
  var params = {
    name,
    mobile,
    verification_code,
    wechat_number,
    referee,
    password,
    type
  };
  reg(params);
});
//注册
function reg(params) {
  //判断手机系统
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  $.ajax({
    type: "POST",
    url: api + "api?url=registerScan",
    data: params,
    dataType: "json",
    success: function(data) {
      if(){
        
      }
      alert("注册成功");
      // if (isiOS) {
      //   console.log(data);
      // } else {
        window.location.href = "https://copy.im/a/zhgfxt";
      // }
    }
  });
}

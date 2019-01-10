let token = "",
  userid = "",
  me_head_imgurl = "",
  me_name = "",
  user_head_imgurl = "",
  user_name = "";
function frontOneHour(fmt) {
  var currentTime = new Date(new Date().getTime());
  var o = {
    "M+": currentTime.getMonth() + 1, // 月份
    "d+": currentTime.getDate(), // 日
    "h+": currentTime.getHours(), // 小时
    "m+": currentTime.getMinutes(), // 分
    "s+": currentTime.getSeconds(), // 秒
    "q+": Math.floor((currentTime.getMonth() + 3) / 3), // 季度
    S: currentTime.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (currentTime.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
}
//初始
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
  token = theRequest.assToken;
  userid = theRequest.userid;
  getUserinfo(theRequest.assToken, userid);
  $.ajax({
    type: "POST",
    url:
      "https://dev170.weibanker.cn/hongjh/www/yumianhu/api?url=getRongCloudToKen",
    data: { access_token: theRequest.assToken },
    dataType: "json",
    success: function(data) {
      if (data.errno == 401) {
        window.location.href =
          "https://dev170.weibanker.cn/chenjj/www/shuaishou/index.html";
        return;
      }
      console.log(data.data.token);
      token = data.data.token;
      RongIMLib.RongIMClient.init("3argexb63quqe");
      RongIMClient.setConnectionStatusListener({
        onChanged: function(status) {
          console.log(status);
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              console.log("链接成功");
              setUnreadCount();
              break;
            case RongIMLib.ConnectionStatus.CONNECTING:
              console.log("正在链接");
              break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              console.log("断开连接");
              break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              console.log("其他设备登录");
              break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
              console.log("域名不正确");
              break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log("网络不可用");
              break;
          }
        }
      });
      // 消息监听器
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function(message) {
          console.log("接受到的信息message：");
          console.log(message);
          if (message.messageType == "TextMessage") {
            var messageStr = `<div class="im_user">
                                      <div class="im_me_img">
                                          <img src="${user_head_imgurl}" alt="">
                                      </div>
                                      <div class="im_me_talk">
                                          <div class="im_user_name">${user_name}<span>${frontOneHour('hh:mm:ss',message.sentTime)}</span></div>
                                          <div class="im_user_text">${
                                            message.content.content
                                          }</div>
                                      </div>
                                  </div>`;
            $(".im_dialogue").append(messageStr);
          }
          if (message.messageType == "ImageMessage") {
            var messageStr = `<div class="im_user">
                                      <div class="im_me_img">
                                          <img src="${user_head_imgurl}" alt="">
                                      </div>
                                      <div class="im_me_talk">
                                          <div class="im_user_name">${user_name}<span>${frontOneHour('hh:mm:ss',message.sentTime)}</span></div>
                                          <div class="im_user_upimg"><img src="${
                                            message.content.imageUri
                                          }"></div>                                          
                                      </div>
                                  </div>`;
            $(".im_dialogue").append(messageStr);
          }
          var div = document.getElementById("im_dialogue");
          div.scrollTop = div.scrollHeight;
        }
      });
      RongIMClient.connect(
        token,
        {
          onSuccess: function(userId) {
            console.log("Connect successfully." + userId);
            userid_send = userId;
          },
          onTokenIncorrect: function() {
            console.log("token无效");
          },
          onError: function(errorCode) {
            var info = "";
            switch (errorCode) {
              case RongIMLib.ErrorCode.TIMEOUT:
                info = "超时";
                break;
              case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                info = "不可接受的协议版本";
                break;
              case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                info = "appkey不正确";
                break;
              case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                info = "服务器不可用";
                break;
            }
            console.log(errorCode);
          }
        }
      );
    }
  });
})();
function getUserinfo(assToken, id) {
  $.ajax({
    type: "POST",
    url: "https://dev170.weibanker.cn/hongjh/www/yumianhu/api?url=getUserInfo",
    data: { access_token: assToken },
    dataType: "json",
    success: function(data) {
      me_head_imgurl = data.data.head_imgurl;
      me_name =
        data.data.nickname != "" ? data.data.nickname : data.data.renickname;
    }
  });
  $.ajax({
    type: "POST",
    url:
      "https://dev170.weibanker.cn/hongjh/www/yumianhu/api?url=getNameImages",
    data: { id: id },
    dataType: "json",
    success: function(data) {
      user_head_imgurl =
        data.data.head_imgurl ||
        "https://dev170.weibanker.cn/hongjh/www/yumianhu/data/Picture/2019-01-04/5c2edf1d41900.png";
      user_name = data.data.nickname;
    }
  });
}
$("#im_button").on("click", function() {
  // 获取消息内容和uid
  var str = $("#im_input").val();
  if (str == "") {
    alert("请输入聊天内容");
    return false;
  }
  var messageStr = `<div class="im_me">
            <div class="im_me_talk">
            <div class="im_me_name"><span>${frontOneHour('hh:mm:ss')}</span>${me_name}</div>
            <div class="im_me_text">${str}</div>
        </div>
        <div class="im_me_img">
            <img src="${me_head_imgurl}" alt="">
        </div>
    </div>`;
  $(".im_dialogue").append(messageStr);
  var div = document.getElementById("im_dialogue");
  div.scrollTop = div.scrollHeight;
  // 发送消息
  rongSendMessage(userid, str);
  // 清空消息框中的内容
  $("#im_input").val("");
});
/**
 * 发送消息
 * @param  {integer} uid  用户id
 * @param  {string}  word 发送的消息
 */
function rongSendMessage(uid, word) {
  // 定义消息类型,文字消息使用 RongIMLib.TextMessage
  var msg = new RongIMLib.TextMessage.obtain(word);
  var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
  var targetId = uid; // 目标 Id
  RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
    // 发送消息成功
    onSuccess: function(message) {
      //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
      console.log("发送信息返回的message:");
      console.log(message);
    },
    onError: function(errorCode, message) {
      var info = "";
      switch (errorCode) {
        case RongIMLib.ErrorCode.TIMEOUT:
          info = "超时";
          break;
        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
          info = "未知错误";
          break;
        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
          info = "在黑名单中，无法向对方发送消息";
          break;
        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
          info = "不在讨论组中";
          break;
        case RongIMLib.ErrorCode.NOT_IN_GROUP:
          info = "不在群组中";
          break;
        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
          info = "不在聊天室中";
          break;
        default:
          info = x;
          break;
      }
      console.log("发送失败:" + info);
    }
  });
}
$(".im_input_file").on("change", function() {
  var file = this.files[0];
  var FileData = new FormData();
  FileData.append("imageFile", file);
  $.ajax({
    url: "https://dev170.weibanker.cn/hongjh/www/yumianhu/api?url=uploadImages",
    type: "POST",
    data: FileData,
    cache: false,
    contentType: false, //不可缺
    processData: false, //不可缺
    success: function(res) {
      console.log(res);
      var messageStr = `<div class="im_me">
                              <div class="im_me_talk">
                              <div class="im_me_name"><span>${frontOneHour('hh:mm:ss')}</span>${me_name}</div>
                              <div class="im_me_upimg"><img src="${
                                res.data.path
                              }"></div>
                          </div>
                          <div class="im_me_img">
                              <img src="${me_head_imgurl}" alt="">
                          </div>
                      </div>`;
      $(".im_dialogue").append(messageStr);
      var div = document.getElementById("im_dialogue");
      div.scrollTop = div.scrollHeight;
      // 发送消息
      sendImage(res.data.base64_path, res.data.path);
      // 清空消息框中的内容
      $(".im_input_file").val("");
    }
  });
});
function sendImage(base64, url) {
  /*
     图片转为可以使用 HTML5 的 FileReader 或者 canvas 也可以上传到后台进行转换。

     注意事项：
         1、缩略图必须是 base64 码的 jpg 图。
         2、不带前缀。
         3、大小建议不超过 100 K。
   */
  var base64Str = base64;
  var imageUri = url; // 上传到自己服务器的 URL。
  var msg = new RongIMLib.ImageMessage({
    content: base64Str,
    imageUri: imageUri
  });
  var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
  var targetId = userid; // 目标 Id
  RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
    onSuccess: function(message) {
      //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
      console.log("Send successfully");
    },
    onError: function(errorCode, message) {
      var info = "";
      switch (errorCode) {
        case RongIMLib.ErrorCode.TIMEOUT:
          info = "超时";
          break;
        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
          info = "未知错误";
          break;
        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
          info = "在黑名单中，无法向对方发送消息";
          break;
        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
          info = "不在讨论组中";
          break;
        case RongIMLib.ErrorCode.NOT_IN_GROUP:
          info = "不在群组中";
          break;
        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
          info = "不在聊天室中";
          break;
        default:
          info = x;
          break;
      }
      console.log("发送失败:" + info);
    }
  });
}

function setUnreadCount() {
  let UnreadCount = getCookie();
  UnreadCount = JSON.parse(UnreadCount);
  let list = [];
  UnreadCount.map((data)=>{
    if(data.id == userid){
      if (data.type == "text") {
        var messageStr = `<div class="im_user">
                                  <div class="im_me_img">
                                      <img src="${user_head_imgurl}" alt="">
                                  </div>
                                  <div class="im_me_talk">
                                      <div class="im_user_name">${user_name}<span>${data.time}</span></div>
                                      <div class="im_user_text">${
                                        data.content
                                      }</div>
                                  </div>
                              </div>`;
        $(".im_dialogue").append(messageStr);
      }
      if (data.type == "img") {
        var messageStr = `<div class="im_user">
                                  <div class="im_me_img">
                                      <img src="${user_head_imgurl}" alt="">
                                  </div>
                                  <div class="im_me_talk">
                                      <div class="im_user_name">${user_name}<span>${data.time}</span></div>
                                      <div class="im_user_upimg"><img src="${
                                        data.content
                                      }"></div>                                          
                                  </div>
                              </div>`;
        $(".im_dialogue").append(messageStr);
      }
    } else {
      list.push(data)
    }
  })
  let lists = JSON.stringify(list);
  setCookie('UnreadCount',lists)
  var div = document.getElementById("im_dialogue");
  div.scrollTop = div.scrollHeight;
}
function setCookie(name, value) {
  var Days = 36000;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
}
function getCookie() {
  var arr,
    reg = new RegExp("(^| )UnreadCount=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
$(".im_back").on("click", function() {
  window.history.go(-1)
});

let token = "",
  userid = "",
  me_head_imgurl = "",
  me_name = "",
  user_head_imgurl = "",
  user_name = "",
  UnreadCount = [];
let UnreadCounts = getCookie();
let api_url = false ? 
              'http://www.shuaishou123.com/sszg/' 
              : 
              'https://dev170.weibanker.cn/hongjh/www/yumianhu/';

UnreadCount = JSON.parse(UnreadCounts)||[];
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
  userid = theRequest.userid;
  $.ajax({
    type: "POST",
    url:
      api_url + "api?url=getRongCloudToKen",
    data: { access_token: theRequest.assToken },
    dataType: "json",
    success: function(data) {
      if (data.errno == 401) {
        window.location.href =
          "http://www.shuaishou123.com/index.html";
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
                getlist(theRequest.assToken);
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
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            console.log('xxxxxxxxxxx')
            var news_id=message.senderUserId;
            $("#im_list").html('');
            getlist(theRequest.assToken);
            // 判断消息类型
            switch(message.messageType){
                case RongIMClient.MessageType.TextMessage:
                    // message.content.content => 消息内容
                    UnreadCount.push({id:news_id, content:message.content.content, type:'text',time:frontOneHour('hh:mm:ss',message.sentTime)});
                    console.log(message.content.content)
                    break;
                case RongIMClient.MessageType.VoiceMessage:
                    // 对声音进行预加载                
                    // message.content.content 格式为 AMR 格式的 base64 码
                    break;
                case RongIMClient.MessageType.ImageMessage:
                    UnreadCount.push({id:news_id, content:message.content.imageUri, type:'img',time:frontOneHour('hh:mm:ss',message.sentTime)});
                   // message.content.content => 图片缩略图 base64。
                   // message.content.imageUri => 原图 URL。
                   break;
                case RongIMClient.MessageType.DiscussionNotificationMessage:
                   // message.content.extension => 讨论组中的人员。
                   break;
                case RongIMClient.MessageType.LocationMessage:
                   // message.content.latiude => 纬度。
                   // message.content.longitude => 经度。
                   // message.content.content => 位置图片 base64。
                   break;
                case RongIMClient.MessageType.RichContentMessage:
                   // message.content.content => 文本消息内容。
                   // message.content.imageUri => 图片 base64。
                   // message.content.url => 原图 URL。
                   break;
                case RongIMClient.MessageType.InformationNotificationMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.ContactNotificationMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.ProfileNotificationMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.CommandNotificationMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.CommandMessage:
                    // do something...
                   break;
                case RongIMClient.MessageType.UnknownMessage:
                    // do something...
                   break;
                default:
                    // do something...
            }
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

//好友列表
let friendsList = [];
function getlist(assToken) {
  $.ajax({
    type: "POST",
    url: api_url + "api?url=myFriendsListRecordB",
    data: { access_token: assToken },
    dataType: "json",
    success: function(data) {
      let list = data.data;
      let UnreadCounts = JSON.stringify(UnreadCount);
      setCookie('UnreadCount',UnreadCounts);
      if (list.length != 0) {
        list.map((data)=>{
            let count = 0;
            for(let i of UnreadCount){
                if(i.id == data.userid){
                    count = 1;
                }
            }
            var messageStr =
              `<div class="friend_list" data-id=${data.userid} data-token=${assToken}>
                  <div class="head_img">
                      <img src=${data.head_imgurl != ''?data.head_imgurl:"https://dev170.weibanker.cn/hongjh/www/yumianhu/data/Picture/2019-01-04/5c2edf1d41900.png"} />
                  </div>
                  <div class="friends_info">
                      <div class="name">${data.nickname}</div>
                      <div class="level">
                          <div class="level_img">
                              <img src="my_VIP.png" alt=""/>
                          </div>
                          <span>${data.level}等级</span>
                      </div>
                  </div>
                  <div class="friends_info">
                    <div class="friend_count_msg">${count==0?'':'新留言'}</div>
                    <div class="friend_count_online">${data.online==0?'':'在线'}</div>
                  </div>
              </div>`;
              $("#im_list").append(messageStr);
                $(".friend_list").on("click",function (e) {
                    console.log(e)
                window.location.href="http://www.shuaishou123.com/im/im.html?userid="+e.currentTarget.dataset.id+"&assToken="+e.currentTarget.dataset.token;    
                })
        })
      }
    }
  });
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

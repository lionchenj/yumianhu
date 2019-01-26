var groupID = "",
  assToken = "",
  me_id = "",
  type = '',
  userList = [];
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
  type = theRequest.type || '';
  groupID = theRequest.groupID;
  assToken = theRequest.assToken;
  me_id = theRequest.me_id;
  getuserList();
})();
function setUser(list) {
  var messageStr = "";
  list.map(res => {
    messageStr += `<div class="user_list">
        <div class="removeIcon none" data-id="${res.userid}">-</div>
        <img class="user_head" src="${res.head_imgurl}">
        <div class="user_name">${res.nickname}</div>
    </div>`;
  });
  $("#setting_dialogue").append(messageStr);
  for (let i of list) {
    if (i.userid == me_id) {
      if (i.master == "1") {
        $(".user_setting").append(
          '<div class="setting_button" id="setting_button">解散群</div>'
        );
       $('.change_name').append(
        '<div class="change_name_input">修改群聊名称</div>'
      );
        messageStr = `<div class="user_list addUser">+</div><div class="user_list removeUser">-</div>`;
        $("#setting_dialogue").append(messageStr);

        $('.close').on("click", function() {
            $('.input_bg').addClass('none');
            $('.input_phone').addClass('none');
        });
        $('.input_bg').on("click", function() {
            $('.input_bg').addClass('none');
            $('.input_phone').addClass('none');
        });
        $('.change_name_input').on('click',function(){
            $('.input_bg').removeClass('none');
            $('.input_phone').removeClass('none');
        })
        $('.confirm').on('click',function(){
            var name = $('.input_title').val();
            $.ajax({
                type: "POST",
                url: api + "api?url=groupRefresh ",
                data: {
                  access_token: assToken,
                  groupid: groupID,
                  group_name :name
                },
                dataType: "json",
                success: function(data) {
                    if(data.errno != '0'){
                        alert(data.errmsg);
                        return;
                    }
                  alert('已修改群名');
                  $('.input_bg').addClass('none');
                  $('.input_phone').addClass('none');
                }
              });
        })
        $("#setting_button").on("click", function() {
          $.ajax({
            type: "POST",
            url: api + "api?url=groupDismiss",
            data: {
              access_token: assToken,
              groupid: groupID
            },
            dataType: "json",
            success: function(data) {
                if(data.errno != '0'){
                    alert(data.errmsg);
                    return;
                }
              window.location.href =
                "https://dev170.weibanker.cn/chenjj/www/im/list"+type+".html?assToken="+assToken;
            }
          });
        });
        $(".removeUser").on('click',function (e) {
            if($('.removeIcon').hasClass('none')){
              $('.removeIcon').removeClass('none');
            } else {
              $('.removeIcon').addClass('none');
            }
        })
        $('.addUser').on("click", function() {
            window.location.href = "groupJoin.html?token=" + assToken + "&groupID=" + groupID + "&me_id=" + me_id;
        });
        $(".removeIcon").on('click',function (e) {
            if(me_id == e.currentTarget.dataset.id){
                alert('群主无法退群');
                return;
            }
            $.ajax({
                type: "POST",
                url: api + "api?url=groupQuitMaster",
                data: {
                  access_token: assToken,
                  groupid: groupID,
                  userid: e.currentTarget.dataset.id
                },
                dataType: "json",
                success: function(data) {
                    window.location.href = 'imsetting.html?groupID='+groupID+"&assToken="+assToken+"&me_id="+me_id;
                }
              });
        })
        return;
      } else {
        $(".user_setting").append(
          '<div class="setting_button" id="setting_button">退群</div>'
        );
        // messageStr = `<div class="user_list addUser">+</div>`;
        // $("#setting_dialogue").append(messageStr);
        $("#setting_button").on("click", function() {
          $.ajax({
            type: "POST",
            url: api + "api?url=groupQuit",
            data: {
              access_token: assToken,
              groupid: groupID
            },
            dataType: "json",
            success: function(data) {
                if(data.errno != '0'){
                    alert(data.errmsg);
                    return;
                }
              window.location.href =
              "https://dev170.weibanker.cn/chenjj/www/im/list"+type+".html?assToken="+assToken;
            }
          });
        });
      }
    }
  }
}
function getuserList() {
  $.ajax({
    type: "POST",
    url: api + "api?url=groupUserQuery",
    data: {
      access_token: assToken,
      groupid: groupID
    },
    dataType: "json",
    success: function(data) {
      console.log(data.data);
      userList = data.data || [];
      setUser(userList);
    }
  });
}
$(".im_back").on("click", function() {
  window.history.go(-1);
});

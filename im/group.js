let groupList = [];
let token;
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
  token = theRequest.token;
  getlist(token);
})();
let friendsList = [];
function getlist(assToken) {
  $.ajax({
    type: "POST",
    url: api + "api?url=myFriendsListRecord",
    data: { access_token: assToken },
    dataType: "json",
    success: function(res) {
      let list = res.data;
      console.log(res.data);
      if (list.length != 0) {
        for (let i in list) {
          console.log(list[i]);
          var messageStr = `<div class="friends_title" ><a class="close_a" name="${i}" href="javascript:void(0);">${i}</a></div>`;
          $("#im_list").append(messageStr);
          for (let j of list[i]) {
            var messageStr = `<div class="friend_list">
                  <div class="head_img">
                      <img src=${
                        j.head_imgurl != ""
                          ? j.head_imgurl
                          : "https://dev170.weibanker.cn/hongjh/www/yumianhu/data/Picture/2019-01-04/5c2edf1d41900.png"
                      } />
                  </div>
                  <div class="friends_info">
                      <div class="name">${j.nickname}</div>
                      <div class="level">
                          <div class="level_img">
                              <img src="my_VIP.png" alt=""/>
                          </div>
                          <span>${j.level}等级</span>
                      </div>
                  </div>
                  <div class="friends_info">
                  <div class="group_checkbox con" data-id=${j.userid} ></div>
                  </div>
              </div>`;
            $("#im_list").append(messageStr);
            
          }
        }
        $(".group_checkbox").on("click", function(e) {
          e.stopPropagation();
          e.preventDefault();
          for (let id of groupList) {
            if (e.currentTarget.dataset.id == id) {
              groupList.splice($.inArray(id, groupList), 1);
              $(this).removeClass("cos");
              $(this).addClass("con");
              return;
            }
          }
          $(this).removeClass("con");
          $(this).addClass("cos");
          groupList.push(e.currentTarget.dataset.id);
        });
      }
    }
  });
}
$(".im_back").on("click", function() {
  window.history.go(-1);
});
$(".right").on("click", function() {
  $('.input_bg').removeClass('none');
  $('.input_phone').removeClass('none');
});
$('.confirm').on("click", function() {
  let userid  = groupList.join(',');
  let name = $('.input_title').val();
  if(name == ''){
    alert('请输入群名');
    return;
  }
  $.ajax({
    type: "POST",
    url: api + "api?url=groupCreate",
    data: {
      access_token: token,
      userid: userid,
      group_name: name
    },
    dataType: "json",
    success: function(data) {
      console.log(data);
      $('.input_bg').addClass('none');
      $('.input_phone').addClass('none');
      window.location.href = "groupIm.html?groupID="+data.data.groupid+"&assToken="+token;
    }
  });
});
$('.close').on("click", function() {
  $('.input_bg').addClass('none');
  $('.input_phone').addClass('none');
});
$('.input_bg').on("click", function() {
  $('.input_bg').addClass('none');
  $('.input_phone').addClass('none');
});

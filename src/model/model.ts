export namespace model {
  //用户信息
  export interface User {
    errno: string;
    errmsg: string;
    mobile: string;
    nickname: string;
    referee: string;
    renickname: string;
    head_imgurl: string;
    level: number;
    friends_count: number;
    stay_by: number;
  }
  //列表
  export interface TransactionItem {
    orderid: string;
    number: string;
    plusminus: string;
    surplus: string;
    coin_id: string;
    userid: string;
    time: string;
    style: string;
    head_imgurl: string;
  }
  //好友列表
  export interface FriendsList {
    errno: string;
    errmsg: string;
    id: string;
    nickname: string;
    mobile: string;
    level: string;
    head_imgurl: string;
    time: string
  }
}

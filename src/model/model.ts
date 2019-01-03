export namespace model {
    export interface User {
        mobile: string,
        nickname: string,
        referee: string,
        renickname: string,
        activate: boolean,
        head_imgurl: string,
        errmsg:string
    }
    //好友列表
    export interface exFriends{
        name:string,
        level:string,
        head_imgurl:string
    }
    

}
import { ServiceBase } from "./ServiceBase";
import { UserStorage } from "../storage/UserStorage";
import { model } from "../model/model";

export class UserService extends ServiceBase {

    private static  _instance: UserService
    public static get Instance(): UserService {
        return this._instance || (this._instance = new this())
    }

    private constructor() {
        super()
    }

    public isLogined(): boolean {
        if (ServiceBase.length > 0) {
            return true
        }
        const accessToken = UserStorage.getCookie("User.AccessTokenKey");
        if (accessToken) {
            ServiceBase.accessToken = accessToken
            return true
        }
        return false
    }
    //关闭app
    public async systemClose (): Promise<string> {
        const resp = await this.httpPost("systemClose",{},false);
        return resp.data;
    }
    //获取手机验证码
    public async getMobileMassges(mobile: string): Promise<void> {
        const params = {
            mobile: mobile
        }
        return await this.httpPost("get_mobile_massges", params, false)
    }
    //检验上线
    public async getMemberIsReferee (type: string): Promise<string> {
        const params = {
            type: type
        }
        const resp = await this.httpPost("getMemberIsReferee", params, true);
        return resp.data.isreferee;
    }
    //添加上线
    public async setMemberReferee (referee: string, type: string): Promise<any> {
        const params = {
            referee: referee,
            type: type
        }
        const resp = await this.httpPost("setMemberReferee", params, true);
        return resp.data;
    }
    //单独注册
    public async registerScan(mobile: string, code: string, name: string, password: string, wechat_number: string, referee: string, type: string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code,
            name: name,
            wechat_number: wechat_number,
            referee,
            type
        }
        return await this.httpPost("registerScan", params, true)
    }
    //注册
    public async register(mobile: string, code: string, name: string, password: string, wechat_number:string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code,
            name: name,
            wechat_number: wechat_number
        }
        return await this.httpPost("register", params, true)
    }
    //注册
    public async registerB(mobile: string, code: string, name: string, password: string, wechat_number:string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code,
            name: name,
            wechat_number: wechat_number
        }
        return await this.httpPost("registerB", params, true)
    }
    //注册
    public async registerC(mobile: string, code: string, name: string, password: string, wechat_number:string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code,
            name: name,
            wechat_number: wechat_number
        }
        return await this.httpPost("registerC", params, true)
    }
    //登陆
    public async login(mobile: string, password: string, activation_code?: string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            activation_code: activation_code
        }
        const resp = await this.httpPost("login", params, false)
        UserStorage.setCookie('typepage',resp.data.type)
        const accessToken = resp.data.access_token
        ServiceBase.accessToken = accessToken
        UserStorage.saveAccessToken(accessToken)
    }
    //登出
    public logout() {
        ServiceBase.accessToken = "";
        UserStorage.clearAccessToken();
    }
    //登出判断
    public async getMemberOutTime(): Promise<void> {
        await this.httpPost("getMemberOutTime")
    }
    //获取用户信息
    public async getUserInfo(): Promise<model.User> {
        const resp = await this.httpPost("getUserInfo")
        if(resp.data){
            return resp.data as model.User
        }else{
            return resp
        }
    }
    //获取用户信息
    public async getUserInfoB(): Promise<model.User> {
        const resp = await this.httpPost("getUserInfoB")
        if(resp.data){
            return resp.data as model.User
        }else{
            return resp
        }
    }
    //获取用户信息
    public async getUserInfoC(): Promise<model.User> {
        const resp = await this.httpPost("getUserInfoC")
        if(resp.data){
            return resp.data as model.User
        }else{
            return resp
        }
    }
    //修改/忘记密码
    public async updatePassword(mobile: string, code: string, password: string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code
        }
        return await this.httpPost("retrievePassword", params, false)
    }
    //轮播
    public async banner(): Promise<any> {
        return await this.httpPost("banner")
    }
    // 修改头像
    public async updateHead(avatar: File): Promise<string> {
        const headImgUrl = await this.uploadFile(avatar)
        const params = {
            head_imgurl: headImgUrl
        }
        await this.httpPost("updateHead", params)
        return headImgUrl
    }
    //统一上传
    public async uploadFile(file: File): Promise<string> {
        const resp = await this.httpUpload(file)
        console.log("uploadFile", resp)
        return resp.data.data.path as string
    }
    //好友列表
    public async myFriendsList(): Promise<any> {
        const resp = await this.httpPost("myFriendsList");
        return resp.data as model.FriendsList
    }
    //好友列表
    public async myFriendsListB(): Promise<any> {
        const resp = await this.httpPost("myFriendsListB");
        return resp.data as model.FriendsList
    }
    //好友列表
    public async myFriendsListC(): Promise<any> {
        const resp = await this.httpPost("myFriendsListC");
        return resp.data as model.FriendsList
    }
    //好友记录
    public async myFriendsListRecord(): Promise<any> {
        const resp = await this.httpPost("myFriendsListRecord");
        return resp.data as model.FriendsList
    }
    //好友记录
    public async myFriendsListRecordB(): Promise<any> {
        const resp = await this.httpPost("myFriendsListRecordB");
        return resp.data as model.FriendsList
    }
    //好友记录
    public async myFriendsListRecordC(): Promise<any> {
        const resp = await this.httpPost("myFriendsListRecordC");
        return resp.data as model.FriendsList
    }
    //升级列表
    public async focusFriendsList(): Promise<any> {
        const resp = await this.httpPost("focusFriendsList")
        return resp.data as model.FriendsList
    }
    //升级列表
    public async focusFriendsListB(): Promise<any> {
        const resp = await this.httpPost("focusFriendsListB")
        return resp.data as model.FriendsList
    }
    //升级列表
    public async focusFriendsListC(): Promise<any> {
        const resp = await this.httpPost("focusFriendsListC")
        return resp.data as model.FriendsList
    }
    //关注
    public async focusFriends(id: string): Promise<void> {
        const params = {
            mobile:id
        }
        return await this.httpPost("focusFriends", params, true)
    }
    //关注
    public async focusFriendsB(id: string): Promise<void> {
        const params = {
            mobile:id
        }
        return await this.httpPost("focusFriendsB", params, true)
    }
    //关注
    public async focusFriendsC(id: string): Promise<void> {
        const params = {
            mobile:id
        }
        return await this.httpPost("focusFriendsC", params, true)
    }
    //待接受好友列表
    public async checkFriendsList(): Promise<any> {
        const resp = await this.httpPost("checkFriendsList");
        return resp.data as model.FriendsList
    }
    //待接受好友列表
    public async checkFriendsListB(): Promise<any> {
        const resp = await this.httpPost("checkFriendsListB");
        return resp.data as model.FriendsList
    }
    //待接受好友列表
    public async checkFriendsListC(): Promise<any> {
        const resp = await this.httpPost("checkFriendsListC");
        return resp.data as model.FriendsList
    }
    //接受好友
    public async checkFriends(mobile: string): Promise<void> {
        const params = {
            mobile:mobile
        }
        return await this.httpPost("checkFriends", params, true)
    }
    //接受好友
    public async checkFriendsB(mobile: string): Promise<void> {
        const params = {
            mobile:mobile
        }
        return await this.httpPost("checkFriendsB", params, true)
    }
    //接受好友
    public async checkFriendsC(mobile: string): Promise<void> {
        const params = {
            mobile:mobile
        }
        return await this.httpPost("checkFriendsC", params, true)
    }
    //接受好友token
    public async getRongCloudToKen(): Promise<any> {
        const resp = await this.httpPost("getRongCloudToKen");
        return resp.data as model.data
    }
}
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
    //获取手机验证码
    public async getMobileMassges(mobile: string): Promise<void> {
        const params = {
            mobile: mobile
        }
        return await this.httpPost("get_mobile_massges", params, false)
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
    //登陆
    public async login(mobile: string, password: string, activation_code?: string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            activation_code: activation_code
        }
        const resp = await this.httpPost("login", params, false)
        const accessToken = resp.data.access_token
        ServiceBase.accessToken = accessToken
        UserStorage.saveAccessToken(accessToken)
    }
    //登出
    public logout() {
        ServiceBase.accessToken = ""
        UserStorage.clearAccessToken()
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
    //修改/忘记密码
    public async updatePassword(mobile: string, code: string, password: string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code
        }
        return await this.httpPost("retrievePassword", params, false)
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
    //升级列表
    public async focusFriendsList(): Promise<any> {
        const resp = await this.httpPost("focusFriendsList")
        return resp.data as model.FriendsList
    }
    //关注
    public async focusFriends(mobile: string): Promise<void> {
        const params = {
            mobile:mobile
        }
        return await this.httpPost("focusFriends", params, true)
    }
    //待接受好友列表
    public async checkFriendsList(): Promise<any> {
        const resp = await this.httpPost("checkFriendsList");
        return resp.data as model.FriendsList
    }
    //接受好友
    public async checkFriends(mobile: string): Promise<void> {
        const params = {
            mobile:mobile
        }
        return await this.httpPost("checkFriends", params, true)
    }
}
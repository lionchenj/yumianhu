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

    public async getMobileMassges(mobile: string): Promise<void> {
        const params = {
            mobile: mobile
        }
        return await this.httpPost("get_mobile_massges", params, false)
        
    }

    public async register(mobile: string, code: string, shareMobile: string, password: string, register_code:string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code,
            referee: shareMobile,
            register_code: register_code
        }
        return await this.httpPost("register", params, false)
    }

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

    public logout() {
        ServiceBase.accessToken = ""
        UserStorage.clearAccessToken()
    }

    public async getUserInfo(): Promise<model.User> {
        const resp = await this.httpPost("getUserInfo")
        if(resp.data){
            return resp.data as model.User
        }else{
            return resp
        }
    }

    public async updatePassword(mobile: string, code: string, password: string, repassword:string): Promise<void> {
        const params = {
            mobile: mobile,
            password: password,
            verification_code: code,
            repassword: repassword
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
    

    public async feedback(content: string, imagesList: Array<File>): Promise<void> {
        const imagePathList = new Array<string>()
        for (const imageFile of imagesList) {
            const path = await this.uploadFile(imageFile)
            imagePathList.push(path)
        }

        const params = {
            content: content,
            imagesList: imagePathList.join(",")
        }
        return await this.httpPost("feedback", params)
    }

    public async uploadFile(file: File): Promise<string> {
        const resp = await this.httpUpload(file)
        console.log("uploadFile", resp)
        return resp.data.data.path + resp.data.path as string
    }

    public async signIn(): Promise<void> {
        return await this.httpPost("signIn")
    }

    public async isSignIn(): Promise<boolean> {

        const resp = await this.httpPost("isSignIn")
        return resp.data.status as boolean
    }
    //银行卡
    public async listPayment(): Promise<void> {
        return await this.httpPost("listPayment")
    }
    //新增银行卡
    public async addPayment(bank_name: string, account:string): Promise<void> {
        const params = {
            bank_name:bank_name,
            account:account
        }
        return await this.httpPost("addPayment", params, true)
    }
    //删除银行卡
    public async deletePayment(account:string): Promise<void> {
        const params = {
            account:account
        }
        return await this.httpPost("deletePayment", params, true)
    }
}
import * as React from 'react';
import { List, InputItem, Button, NavBar, Icon, Toast, Modal } from "antd-mobile";
import { Redirect } from "react-router-dom";
import { History, Location } from "history";
import qs from "qs";
// import logo from "../../assets/logo.png"

// import './registered.css'
import { UserService } from '../../service/UserService';
import { Util } from '../../utils/Util';
import { UIUtil } from '../../utils/UIUtil';

interface Props {
    location: Location,
    history: History
}

interface registeredCState {
    redirectToLogin: boolean,
    changeL: boolean,
    codeCountDown: number,
}

export class registeredC extends React.Component<Props, registeredCState> {
    codeCountDownTimer: number
    phone: string
    code: string
    onWeiXin: string
    password: string
    name: string
    constructor(props: Props) {
        super(props)
        this.codeCountDownTimer = 0
        this.state = {
            changeL: true,
            redirectToLogin: false,
            codeCountDown: 0
        }
    }
    navBack = () => {
        this.setState({
            ...this.state,
            redirectToLogin: true
        })
    }
    changeCn = () => {
        this.setState({
            changeL: true
        })
    }
    changeEn = () => {
        this.setState({
            changeL: false
        })
    }
    onPhoneBlur = (value: string) => {
        console.log("onPhoneBlur", value)
        this.phone = value
    }

    onCodeBlur = (value: string) => {
        this.code = value
    }

    onWeiXinBlur = (value: string) => {
        this.onWeiXin = value
    }

    onPasswordBlur = (value: string) => {
        this.password = value
    }
    onNameBlur = (value: string) => {
        this.name = value
    }
    onSubmit = () => {
        const info = "请输入11位手机号码"
        const codeInfo = "请输入验证码"
        const passwordInfo = "请输入不少于6位长度的密码"
        const nameInfo = "请输入姓名"
        const weiXinInfo = "请输入微信号"
        if (!this.phone) {
            Toast.info(info)
            return
        } 
        const trimPhone = Util.trim(this.phone!)
        if (!Util.validPhone(trimPhone)){
            Toast.info(info)
            return
        }
        if (!this.code) {
            Toast.info(codeInfo)
            return
        }
        const trimCode = Util.trim(this.code!)
        
        if (!this.password) {
            Toast.info(passwordInfo)
            return
        }
        const trimPassword = Util.trim(this.password!)
        if (!Util.validPassword(trimPassword)){
            Toast.info(passwordInfo)
            return 
        }
        if (!this.name) {
            Toast.info(nameInfo)
            return
        }
        if (!this.onWeiXin) {
            Toast.info(weiXinInfo)
            return
        }
        UserService.Instance.registerC(trimPhone, trimCode, this.name, trimPassword, this.onWeiXin).then( () => {
            const alert = Modal.alert
            alert('提示','注册成功',[{ text:'ok',onPress: () => console.log('ok'),style: 'default' }])
            this.setState({
                ...this.state,
                redirectToLogin: true
            })
        }).catch( err => {
            const message = (err as Error).message
            Toast.fail(message)
        })
        
    }
    public componentDidMount() {
        const mobile = this.props.location.state&&this.props.location.state.mobile||'';
        console.log(mobile)
        if (mobile) {
            this.onWeiXin = mobile
        }
    }
    getCode = () => {
        if (this.state.codeCountDown > 0) {
            return 
        }
        const phone =  this.phone
        const info = "请输入11位手机号码"
        if (!phone) {
            Toast.info(info)
            return
        }
        const trimPhone = Util.trim(phone)
        if (!Util.validPhone(trimPhone)) {
            Toast.info(info)
            return 
        }
        
        UIUtil.showLoading("正在发送验证码")
        UserService.Instance.getMobileMassges(trimPhone).then( ()=> {
            if (this.codeCountDownTimer != 0) {
                window.clearInterval(this.codeCountDownTimer!)
            }
            const info = "验证码发送成功"
            UIUtil.showInfo(info)
            this.setState({
                ...this.state,
                codeCountDown: 60
            }, () => {
                this.codeCountDownTimer = window.setInterval(this._codeCountDownHander, 1000)
            })
        }).catch( (err) => {
            UIUtil.showError(err)
        })
    }

    

    public render() {
        const { redirectToLogin} = this.state
    
        if (redirectToLogin) {
            const to = {
                pathname: "/home3"
            }
            return <Redirect to={to} />
        }

        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        })
        if (query.mobile) {
            this.onWeiXin = query.mobile
        }
        
        return (
            <div className="login-container">
                <NavBar mode="light" icon={<Icon type="left" color="#fff" />} onLeftClick={this.navBack} >代理注册</NavBar>
                    <div className="content">
                        <List className="content-item-border">
                            <InputItem type="text" placeholder={"请输入姓名"} onBlur={this.onNameBlur} >姓名</InputItem>
                        </List>
                        <List className="content-item-border">
                            <InputItem name="phone" type="number" maxLength={11} placeholder={"请输入手机号"} onBlur={this.onPhoneBlur}>手机号</InputItem>
                        </List>
                        <List className="content-item-border">
                            <InputItem  type="digit" placeholder={"请输入短信验证码"} onBlur={this.onCodeBlur}
                                extra={
                                    <Button disabled={this.state.codeCountDown > 0} type="ghost" inline size="small">{ this.state.codeCountDown > 0 ? this.state.codeCountDown: ("获取验证码")}</Button>
                                }
                                onExtraClick={ this.state.codeCountDown > 0 ? undefined : this.getCode}>验证码
                            </InputItem>
                        </List>
                        <List className="content-item-border">
                            <InputItem type="text" placeholder={"请输入微信号"} onBlur={this.onWeiXinBlur} defaultValue={this.onWeiXin}>微信号</InputItem>
                        </List>
                        <List className="content-item-border">
                            <InputItem type="password" placeholder={"请输入登录密码"} onBlur={this.onPasswordBlur}>登录密码</InputItem>
                        </List>
                        <div className="registered_button">
                            <List className="content-item">
                                <Button type="ghost" className="registered_confirm" onClick={this.onSubmit}>{"确认"}</Button>
                            </List>
                        </div>
                    </div>
            </div>

        )
    }

    public componentWillUnmount() {
        this.codeCountDownTimer && window.clearInterval(this.codeCountDownTimer)
        this.codeCountDownTimer = 0
    }

    private _codeCountDownHander = () =>  {
        const newCodeCount = this.state.codeCountDown - 1
        if (newCodeCount <= 0) {
            this.codeCountDownTimer && window.clearInterval(this.codeCountDownTimer)
            this.codeCountDownTimer = 0
        }
        this.setState({
            ...this.state,
            codeCountDown: newCodeCount
        })
    }

    
}
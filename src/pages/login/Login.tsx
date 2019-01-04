import * as React from 'react';
import { History, Location } from "history";
import { Redirect, Link } from "react-router-dom";
import { List, InputItem, Button, Toast, WhiteSpace } from "antd-mobile";

import phone from "../../assets/login_phone.png"
import pwd from "../../assets/login_pwd.png"

// import { UserStorage } from "../../storage/UserStorage";
// import  createForm  from "rc-form";

// import logo from "../../assets/logo.png"


import './Login.css'
import { Util } from '../../utils/Util';
import { UserService } from '../../service/UserService';



export interface LoginProps {
    history: History
    location: Location<any> | undefined
}

interface LoginState {
    redirectToReferrer: boolean,
    activate: boolean
}

export class Login extends React.Component<LoginProps, LoginState> {
    phone: string
    password: string
    activation: string
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            redirectToReferrer: false,
            activate: false
        }
    }

    navToRegister = () => {
        this.setState( {
            redirectToReferrer: false,
        })
    }
    onPhoneBlur = (value: string) => {
        this.phone = value
    }
    onPasswordBlur = (value: string) => {
        this.password = value
    }
    onActivationBlur = (value: string) => {
        this.activation = value
    }

    onSubmit = () => {
        const info = "请输入11位手机号码"
        const passwordInfo = "请输入不少于6位长度的密码"

        if (!this.phone) {
            Toast.info(info)
            return
        }
        const trimPhone = Util.trim(this.phone)
        if (!Util.validPhone(trimPhone)) {
            Toast.info(info)
            return
        }
        if (!this.password) {
            Toast.info(passwordInfo)
            return
        }
        const trimPassword = Util.trim(this.password)
        if (!Util.validPassword(trimPassword)){
            Toast.info(passwordInfo)
            return
        }
        UserService.Instance.login(trimPhone, trimPassword, this.activation).then( ()=>{
            this.setState({
                ...this.state,
                redirectToReferrer: true
            })
        }).catch( err => {
            const message = (err as Error).message;
            Toast.fail(message);
        })
    }

    public componentDidCatch(error: any, info: any) {
        console.log("componentDidCatch", error, info)
    }

    public render() {
        const { redirectToReferrer} = this.state
        if (redirectToReferrer) {
            const to = {
                pathname: "/home"
            }
            return <Redirect to={to} />
        }
        // if (redirectToRegister) {
        //     const to = {
        //         pathname: "/register"
        //     }
        //     return <Redirect to={to} />
        // }

        
        return (
            <div className="login-container">
                    <div className="login_content">
                        <List className="login_border">
                        <List.Item thumb= {phone}>
                        <InputItem type="number" maxLength={11} placeholder="请输入手机号" onBlur={this.onPhoneBlur}></InputItem>
                        </List.Item>
                        </List>
                        <List className="login_border">
                        <List.Item thumb= {pwd}>
                        <InputItem type="password" placeholder="请输入登录密码" onBlur={this.onPasswordBlur}></InputItem>
                        </List.Item>
                        </List>
                        <List className="login_forget">
                            <Link to="/forget_pwd" className="forget-link" >忘记密码？</Link>
                        </List>
                        <WhiteSpace size="lg" />
                        <WhiteSpace size="lg" />
                        <div className="login_button">
                            <List className="content-item">
                                <Button type="ghost" className="login_confirm" onClick={this.onSubmit}>登陆</Button>
                            </List>
                        </div>
                    </div>
                    
            </div>

        )
    }
}




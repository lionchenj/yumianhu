import * as React from 'react';
import { NavBar, Icon, } from "antd-mobile";
import { History } from "history";
import  QRCode  from "qrcode.react";
import share_bg from "../../assets/share_bg.png"
// import QR_code from "../../assets/QR_code.png"
import defaults from "../../assets/default.png"
import { UserStorage } from "../../storage/UserStorage";
import { Redirect } from "react-router-dom";
import "./share.css"
//判断手机系统
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var typepage = '';

interface shareProps {
    history: History
}


interface shareState {
    redirectToLogin: boolean
    height: number
    refUrl: string

}
let userinfoA = UserStorage.getCookie('userinfoA')||'';
let userinfo = userinfoA?JSON.parse(userinfoA):{head_imgurl:defaults,nickname:'******'};
const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';
export class share extends React.Component<shareProps, shareState> {

    constructor(props: shareProps) {
        super(props);
          this.state = {
            height:  document.documentElement.clientHeight - 200,
            redirectToLogin: false,
            refUrl: 'https://copy.im/a/zhgfxt'
          };
        
    }

    onRedirectBack = () => {
        this.setState({
            ...this.state,
            redirectToLogin: true
        })
    }

    componentDidMount() {
        if(isiOS){
            this.setState({
                refUrl: 'https://copy.im/a/zhgfxt'
            })
        }
    }

    public render() {
        const { redirectToLogin} = this.state
        typepage = UserStorage.getCookie('typepage')||'';
        if (redirectToLogin) {
            const to = {
                pathname: "/home"+typepage
            }
            return <Redirect to={to} />
        }
        return (
            <div className="message-container">
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">分享</div>
                </NavBar>
                <div style={{height:bodyHeight,background:'#FF4A43'}}>
                <div className="share_img">
                    <img className="share_head" src={userinfo.head_imgurl} alt=""/>
                    <div className="share_name">{userinfo.nickname}</div>
                    <img src={share_bg} alt=""/>
                    <div className="QR_code">
                        <QRCode value={this.state.refUrl} size={178} />
                    </div>
                    {/* <img className="QR_code" src={QR_code} alt=""/> */}
                </div>
                </div>
            </div>
        )
    }
}
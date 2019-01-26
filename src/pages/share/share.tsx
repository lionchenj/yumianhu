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
interface shareProps {
    history: History
}


interface shareState {
    redirectToLogin: boolean
    height: number
    refUrl: string
    typepage: string
    userinfo: any
}
const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';
export class share extends React.Component<shareProps, shareState> {

    constructor(props: shareProps) {
        super(props);
          this.state = {
            height:  document.documentElement.clientHeight - 200,
            redirectToLogin: false,
            refUrl: '',
            typepage: '2',
            userinfo: []
          };
        
    }

    onRedirectBack = () => {
        this.setState({
            ...this.state,
            redirectToLogin: true
        })
    }

    componentDidMount() {
        let userinfoA = UserStorage.getCookie('userInfo')||'';
        let userinfo = userinfoA?JSON.parse(userinfoA):{head_imgurl:defaults,nickname:'******'};
        var typepage = UserStorage.getCookie('typepage')||'';
        console.log('typepage'+typepage)
        this.setState({
            typepage: typepage,
            userinfo:userinfo
        })
        console.log(this.state.refUrl)
    }

    public render() {
        const { redirectToLogin} = this.state
        if (redirectToLogin) {
            const to = {
                pathname: "/home"+this.state.typepage
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
                    <img className="share_head" src={this.state.userinfo.head_imgurl} alt=""/>
                    <div className="share_name">{this.state.userinfo.nickname}</div>
                    <img src={share_bg} alt=""/>
                    <div className="QR_code">
                        <QRCode value={'http://www.shuaishou123.com/im/registeredX.html?type='+this.state.typepage+'&referee='+this.state.userinfo.mobile} size={178} />
                    </div>
                    {/* <img className="QR_code" src={QR_code} alt=""/> */}
                </div>
                </div>
            </div>
        )
    }
}
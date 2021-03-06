import * as React from 'react';
import { NavBar, Icon, List} from "antd-mobile";
import { Redirect } from "react-router-dom";
import { History } from "history";
import "./Settings.css"
import { UserStorage } from "../../storage/UserStorage";

interface SettingsProps {
    history: History,
    
}

interface SettingsState {
    redirectToLogin: boolean,
    checkeds: boolean
}

export class Settings extends React.Component<SettingsProps, SettingsState> {

    constructor(props: SettingsProps) {
        super(props)
        this.state = {
            redirectToLogin: false,
            checkeds: false
        }
    }

    onRedirectBack = () => {
        this.setState({
            ...this.state,
            redirectToLogin: true
        })
    }

    public render() {
        let typepage = UserStorage.getCookie('typepage')||'';
        if (this.state.redirectToLogin) {
            const to = {
                pathname: "/home"+typepage
            }
            return <Redirect to={to} />
        }
        return (
            <div className="message-container">
                <NavBar icon={<Icon type="left" />} 
                    onLeftClick={ this.onRedirectBack }
                    className="home-navbar" >
                        <div className="nav-title">设置</div>
                </NavBar>
                <List renderHeader={() => ''} className="content-item-border">
                    <List.Item arrow="horizontal" onClick={()=>{this.props.history.push("/updata_pwd")}}>登陆密码修改</List.Item>
                </List>
            </div>
        )
    }
}
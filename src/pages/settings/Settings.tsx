import * as React from 'react';
import { NavBar, Icon, List} from "antd-mobile";
import { Redirect } from "react-router-dom";
import { History } from "history";
import "./Settings.css"
// import { UserStorage } from "../../storage/UserStorage";

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
        const history = this.props.history
        history.goBack()
    }

    public render() {
        if (this.state.redirectToLogin) {
            const to = {
                pathname: "/login"
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
                <List renderHeader={() => ''} className="my-list">
                    <List.Item arrow="horizontal" onClick={()=>{this.props.history.push("/updata_pwd")}}>登陆密码修改</List.Item>
                </List>
            </div>
        )
    }
}
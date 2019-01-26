import * as React from "react";
import { Redirect } from "react-router-dom";
import { NavBar, Icon } from "antd-mobile";
import { History } from "history";
import { UserStorage } from "../../storage/UserStorage";

interface downloadProps {
  history: History;
}

interface downloadState {
  redirectToLogin: boolean;
}
let width = window.innerWidth;
let height = window.innerHeight;
export class download extends React.Component<
  downloadProps,
  downloadState
> {
  rData: any;
  lv: any;

  constructor(props: downloadProps) {
    super(props);
    this.state = {
      redirectToLogin: false
    };
  }

  onRedirectBack = () => {
    this.setState({
      ...this.state,
      redirectToLogin: true
    });
  };
  componentDidMount() {
    
  }

  public render() {
    const { redirectToLogin } = this.state;
      let typepage = UserStorage.getCookie('typepage')||'';
        if (redirectToLogin) {
      const to = {
        pathname: "/home"+typepage
      };
      return <Redirect to={to} />;
    }
    return (
      <div className="message-container">
        <NavBar icon={<Icon type="left" />}
            onLeftClick={this.onRedirectBack}
            className="home-navbar" >
            <div className="nav-title">时空夺宝</div>
        </NavBar>
        <div className="iframe-tab-1">
          <iframe
            src={'https://fir.im/27vh?openId=oGB0CjxXyc6sv5o1Jl63rTQV4qXE'}
            height={height}
            width={width}
            scrolling="0"
          />
        </div>
      </div>
    );
  }
}

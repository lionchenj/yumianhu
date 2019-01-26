import * as React from "react";
import { Redirect } from "react-router-dom";
import { History } from "history";
import { UserStorage } from "../../storage/UserStorage";

interface friendListProps {
  history: History;
}

interface friendListState {
  redirectToLogin: boolean;
}
let width = window.innerWidth;
let height = window.innerHeight;
// const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';
export class friendList extends React.Component<
  friendListProps,
  friendListState
> {
  rData: any;
  lv: any;

  constructor(props: friendListProps) {
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

    if (redirectToLogin) {
      const to = {
        pathname: "/home1"
      };
      return <Redirect to={to} />;
    }
    const accessToken = UserStorage.getCookie("User.AccessTokenKey");
    return (
      <div className="message-container">
        <div className="iframe-tab-1">
          <iframe
            src={
              false
                ? "http://www.shuaishou123.com/im/list.html?assToken=" +
                  accessToken
                : "https://dev170.weibanker.cn/chenjj/www/im/list.html?assToken=" +
                  accessToken
            }
            height={height}
            width={width}
            scrolling="0"
          />
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import './App.css';
// import { UserStorage } from "./storage/UserStorage";
// import { Button } from 'antd-mobile'
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { registered } from "./pages/registered/registered";
import { Home } from "./pages/home/Home";
import { Settings } from "./pages/settings/Settings";
import { ForgetPwd } from "./pages/forgetPwd/ForgetPwd";
import { friendList } from "./pages/friendList/friendList";
import { datingrecord } from "./pages/datingrecord/datingrecord";
import { friendsUn } from "./pages/friendsUn/friendsUn";
import { friendsLog } from "./pages/friendsLog/friendsLog";
import { UpdataPwd } from "./pages/updataPwd/UpdataPwd";
// const NotFound = () => (
//   <div> Sorry, this page does not exist. </div>
// )
class App extends React.Component {
  public render() {
    return (
      <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route path="/login"  component={Login} />
          <Route path="/register"  component={Register} />
          <Route path="/registered"  component={registered} />
          <PrivateRoute path="/settings" component={Settings} />
          <Route path="/forget_pwd" component={ForgetPwd} />
          <PrivateRoute path="/friendList" component={friendList} />
          <PrivateRoute path="/datingrecord" component={datingrecord} />
          <PrivateRoute path="/friendsUn" component={friendsUn} />
          <PrivateRoute path="/friendsLog" component={friendsLog} />
          <PrivateRoute path="/updata_pwd" component={UpdataPwd} />
          <PrivateRoute component={Home} />
      </Switch>
    );
  }
}

export default App;

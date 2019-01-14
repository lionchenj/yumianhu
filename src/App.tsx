import * as React from 'react';
import './App.css';
// import { UserStorage } from "./storage/UserStorage";
// import { Button } from 'antd-mobile'
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./pages/login/Login";
import { registered } from "./pages/registered/registered";
import { registeredB } from "./pages/registeredB/registeredB";
import { registeredC } from "./pages/registeredC/registeredC";
import { Home } from "./pages/home/Home";
import { HomeC } from "./pages/homeC/HomeC";
import { HomeB } from "./pages/homeB/HomeB";
import { Settings } from "./pages/settings/Settings";
import { ForgetPwd } from "./pages/forgetPwd/ForgetPwd";
import { friendList } from "./pages/friendList/friendList";
import { friendListB } from "./pages/friendListB/friendListB";
import { friendListC } from "./pages/friendListC/friendListC";
import { datingrecord } from "./pages/datingrecord/datingrecord";
import { share } from "./pages/share/share";
import { friendsUn } from "./pages/friendsUn/friendsUn";
import { friendsUnB } from "./pages/friendsUnB/friendsUnB";
import { friendsUnC } from "./pages/friendsUnC/friendsUnC";
import { friendsLog } from "./pages/friendsLog/friendsLog";
import { friendsLogB } from "./pages/friendsLogB/friendsLogB";
import { friendsLogC } from "./pages/friendsLogC/friendsLogC";
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
          <PrivateRoute exact path="/homeB" component={HomeB} />
          <PrivateRoute exact path="/homeC" component={HomeC} />
          <Route path="/login"  component={Login} />
          <Route path="/registered"  component={registered} />
          <Route path="/registeredB"  component={registeredB} />
          <Route path="/registeredC"  component={registeredC} />
          <PrivateRoute path="/settings" component={Settings} />
          <Route path="/forget_pwd" component={ForgetPwd} />
          <PrivateRoute path="/friendList" component={friendList} />
          <PrivateRoute path="/friendListB" component={friendListB} />
          <PrivateRoute path="/friendListC" component={friendListC} />
          <PrivateRoute path="/share" component={share} />
          <PrivateRoute path="/datingrecord" component={datingrecord} />
          <PrivateRoute path="/friendsUn" component={friendsUn} />
          <PrivateRoute path="/friendsUnB" component={friendsUnB} />
          <PrivateRoute path="/friendsUnC" component={friendsUnC} />
          <PrivateRoute path="/friendsLog" component={friendsLog} />
          <PrivateRoute path="/friendsLogB" component={friendsLogB} />
          <PrivateRoute path="/friendsLogC" component={friendsLogC} />
          <PrivateRoute path="/updata_pwd" component={UpdataPwd} />
          <PrivateRoute component={Home} />
      </Switch>
    );
  }
}

export default App;

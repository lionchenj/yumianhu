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
import { undetermined } from "./pages/undetermined/undetermined";
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
          <PrivateRoute path="/undetermined" component={undetermined} />
          <Route component={Home} />
      </Switch>
    );
  }
}

export default App;

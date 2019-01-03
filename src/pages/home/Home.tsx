import * as React from 'react';
import { TabBar, List, NavBar, Modal} from "antd-mobile";
import { History, Location } from "history";
// import { UserStorage } from "../../storage/UserStorage";
import "./Home.css"

import registered from "../../assets/icon_registered.png"
import viplevel from "../../assets/icon_viplevel.png"
import topass from "../../assets/icon_topass.png"
import datingrecord from "../../assets/icon_datingrecord.png"
import tab_home from "../../assets/tab_home.png"
import tab_home_n from "../../assets/tab_home_n.png"
import tab_my from "../../assets/tab_my.png"
import tab_my_n from "../../assets/tab_my_n.png"
import my_friends from "../../assets/my_friends.png"
import my_topass from "../../assets/my_topass.png"
import my_setting from "../../assets/my_setting.png"
import my_logout from "../../assets/my_logout.png"
import follow from "../../assets/follow.png"
import follow_n from "../../assets/follow_n.png"
import close from "../../assets/close.png"
import king from "../../assets/my_VIP.png"
import defaults from "../../assets/default.png"

import { UserService } from '../../service/UserService';

// import { model } from '../../model/model';
import { UIUtil } from '../../utils/UIUtil';


interface HomeProps {
    history: History
    location: Location
}

interface HomeState {
    selectedTab: "HomeTab"|"MyTab",
    userInfo: any,
    list: any,
    index: number,
    friends: any,
    showKey: boolean,
    isFollow: boolean
}
console.log(window.innerHeight)
const pageheight = window.innerHeight-95;
export class Home extends React.Component<HomeProps, HomeState> {
    rData: any
    lv: any
    avatarInput: any
    inapp?: string
    min:number
    max:number
    interva: any
    
    constructor(props: HomeProps) {
        super(props)
         //   const dataSource = new ListView.DataSource({
        //     rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
        //   });
        this.state = {
            selectedTab: "HomeTab",
            userInfo:'',
            list: [],
            friends: [{img_path:defaults,name:'谁谁谁',level:'2'}],
            index: 0,
            showKey: false,
            isFollow: false
        }
    }

    onTapHomeMenu = (e:any) => {
        console.log(e.currentTarget.dataset.id)
        let index = e.currentTarget.dataset.id;
        console.log("onTapHomeMenu", index)
        if (index == 0) {
            this.props.history.push("/registered");
        } else if (index == 1) {
            this.setState({ showKey: true });
        } else if (index == 2) {
            this.props.history.push("/undetermined");
        } else if (index == 3) {
            this.props.history.push("/friendList");
        }
    }
    onClose = () => {
        this.setState({
            showKey: false
        })
    }
    onFollow = (e:any) => {
        let index = e.currentTarget.dataset.id;
        console.log(index)
        let isFollow = this.state.isFollow;
        this.setState({
            isFollow:!isFollow
        })
    }
    onAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const files = event.target.files
        if (!files || files.length == 0) {
            return 
        }
        UIUtil.showLoading("上传中")
        UserService.Instance.updateHead(files[0]).then( avatarUrl => {
            const userInfo = this.state.userInfo
            if (userInfo) {
                userInfo.head_imgurl = avatarUrl
                this.setState({
                    userInfo: userInfo
                })
            }
            UIUtil.hideLoading()
        }).catch( err => {
            UIUtil.showError(err)
        })
    }
    public componentDidUpdate() {

    }
    public componentWillMount() {
        
    }
    public componentDidMount() {
        UserService.Instance.getUserInfo().then( userInfo => {
            if (userInfo.errmsg) {
                this.props.history.push("/login");
                return;
            }else{
                this.setState({
                    ...this.state,
                    userInfo: userInfo
                })
            }
        }).catch ( err => {
            
        })
    }
    

    public render() {
        let list = [];
        for(var i=0;i<3;i++){
            list.push( <div className="index_modal_list" key={i}>
            <div className="head_img">
                <img src={defaults} />
            </div>
            <div className="friends_info">
                <div className="text">'某某某'</div>
                <div className="text">12312312345</div>
                <div className="text">
                    <div className="level_img">
                        <img src={king} alt=""/>
                    </div>
                    <span>0等级</span>
                </div>
                <div className="text index_follow" data-id={i} onClick={this.onFollow}>
                    <div className="level_img">
                        <img src={this.state.isFollow?follow:follow_n} alt=""/>
                    </div>
                    <span>{this.state.isFollow?'已关注':'未关注'}</span>
                </div>
            </div>
        </div>)
        }
        
        //   const separator = (sectionID: number, rowID: number) => (
        //     <div
        //       key={`${sectionID}-${rowID}`}
        //       style={{
        //         backgroundColor: '#F5F5F5',
        //         height: 1,
        //       }}
        //     />
        //   );
  
        //   const row = (rowData: model.exFriends, sectionID: number, rowID: number) => {
        //     return (
                    // <div className="friend_list">
                    //     <div className="head_img">
                    //         <img src={i.img_path?i.img_path:defaults} />
                    //     </div>
                    //     <div className="friends_info">
                    //         <div className="name">{i.name?i.name:'某某某'}</div>
                    //         <div className="level">
                    //             <div className="level_img">
                    //                 <img src={king} alt=""/>
                    //             </div>
                    //             <span>{i.level?i.level:'0'}等级</span>
                    //         </div>
                    //     </div>
                    // </div>
        //     );
        //   };
        return (
            <div className="home-container">
                    <div className="tab-bar-container margin-t0">
                    <NavBar className="home-navbar" >{this.state.selectedTab === 'HomeTab' ?'首页':'个人中心'}</NavBar>
                        <TabBar unselectedTintColor="#B8B8BA" tintColor="#000000" barTintColor="#fff" tabBarPosition="bottom">
                            <TabBar.Item title="首页" key="HomeTab" 
                                selected={this.state.selectedTab === 'HomeTab'}
                                onPress={
                                    () => {
                                        this.setState({
                                            ...this.state,
                                            selectedTab: "HomeTab"
                                        })
                                        this.props.history.push("#HomeTab")
                                    }
                                }
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url('+ tab_home_n + ') center center /  21px 21px no-repeat' }}
                                  />
                                  }
                                selectedIcon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    color: '#1FA4FC',
                                    background: 'url('+ tab_home +') center center /  21px 21px no-repeat' }}
                                /> }
                            >
                            
                               <div style={{height:pageheight}}>
                                    <List className="bg_w padding_tb">
                                        <div className="index_tab">
                                            <div className="index_icon" data-id="0" onClick={this.onTapHomeMenu}>
                                                <img src={registered} alt=""/>
                                            </div>
                                            <div className="index_icon" data-id="1" onClick={this.onTapHomeMenu}>
                                                <span className="index_levelup"></span>
                                                <img src={viplevel} alt=""/>
                                            </div>
                                            <div className="index_icon" data-id="2" onClick={this.onTapHomeMenu}>
                                                <img src={topass} alt=""/>
                                            </div>
                                            <div className="index_icon" data-id="3" onClick={this.onTapHomeMenu}>
                                                <img src={datingrecord} alt=""/>
                                            </div>
                                        </div>
                                    </List>

                                    
                                    <List className="bg_w"><List.Item>我的好友</List.Item></List>
                                    <div className="viewheight"></div>
                                    {/* <ListView
                                        ref={el => this.lv = el}
                                        dataSource={this.state.dataSource}
                                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                                        {this.state.isLoading ? 'Loading...' : ''}
                                        </div>)}
                                        renderRow={row}
                                        renderSeparator={separator}
                                        className="viewheight am-list bg_w"
                                        pageSize={3}
                                        // useBodyScroll
                                        onScroll={() => { console.log('scroll'); }}
                                        scrollRenderAheadDistance={500}
                                        onEndReached={this.onEndReached}
                                        onEndReachedThreshold={10}
                                        style={{
                                            height: this.state.height,
                                            overflow: 'auto',
                                        }}
                                    /> */}
                               </div>
                            </TabBar.Item>
                            
                            <TabBar.Item title="个人中心" key="MyTab"
                                selected={this.state.selectedTab === 'MyTab'}
                                onPress={
                                    () => {
                                        this.setState({
                                            ...this.state,
                                            selectedTab: "MyTab"
                                        })
                                        this.props.history.push("#MyTab")
                                    }
                                }
                                icon={
                                    <div style={{
                                      width: '22px',
                                      height: '22px',
                                      background: 'url(' + tab_my_n + ') center center /  21px 21px no-repeat' }}
                                    />
                                  }
                                  selectedIcon={
                                    <div style={{
                                      width: '22px',
                                      height: '22px',
                                      color: '#1FA4FC',
                                      background: 'url(' + tab_my + ') center center /  21px 21px no-repeat' }}
                                    />
                                  }
                            >
                            <div>
                                <div style={{height:pageheight}}>
                                    <div className="my_content">
                                        <div className="my_haed">
                                            <input className="my_haed_input" type="file" onChange={this.onAvatarChange}/>
                                            <img className="my_logo" src={this.state.userInfo && this.state.userInfo.head_imgurl}/>
                                        </div>
                                        <div className="my_info_container">
                                            <div className="my_nickname">{this.state.userInfo && this.state.userInfo.nickname}</div>
                                            <div className="my_phone">{this.state.userInfo && this.state.userInfo.mobile}</div>
                                        </div>
                                        <div className="my_info_friends after">
                                            <div className="my_friends">
                                                <div>我的好友</div>
                                                <div>99</div>
                                            </div>
                                            <div className="my_friends">
                                                <div>待通过</div>
                                                <div>1</div>
                                            </div>
                                        </div>
                                    </div>
                                    <List renderHeader={() => ''} className="profile_list">
                                        <List.Item
                                            thumb= {my_friends}
                                            arrow="horizontal"
                                            onClick={()=>{this.props.history.push("/friendList")}}
                                            >我的好友
                                        </List.Item>
                                        <List.Item
                                            thumb= {my_topass}
                                            onClick={()=>{this.props.history.push("/undetermined")}}
                                            arrow="horizontal"
                                            >待通过
                                        </List.Item>
                                        <List.Item
                                            thumb= {my_setting}
                                            onClick={()=>{this.props.history.push("/settings")}}
                                            arrow="horizontal"
                                            >设置
                                        </List.Item>
                                        <List.Item
                                            thumb= {my_logout}
                                            onClick={()=>{
                                                const alert = Modal.alert
                                                alert('提示','是否确认退出',[
                                                    { text: '是', onPress: () => {} },
                                                    { text: '否', onPress: () => {} }
                                                ])
                                            }}
                                            arrow="horizontal"
                                            >退出登陆
                                        </List.Item>
                                    </List>
                                </div>
                            </div>
                        </TabBar.Item>
                    </TabBar>
                </div>
                <div className={this.state.showKey?'':'none'}>
                    <div onClick={()=>{return false}} className="index_modal">
                        <div className="index_modal_body">
                            <div className="index_modal_close" onClick={this.onClose}>
                                <img src={close} alt=""/>
                            </div>
                            <div className="index_modal_title">等级提升</div>
                            <div className="index_modal_lists">
                                {list}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
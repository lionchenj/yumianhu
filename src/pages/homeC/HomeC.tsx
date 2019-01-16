import * as React from 'react';
import { TabBar, List, NavBar, Modal, Carousel} from "antd-mobile";
import { History, Location } from "history";
import { UserStorage } from "../../storage/UserStorage";

import registered from "../../assets/icon_registered.png"
import viplevel from "../../assets/icon_viplevel.png"
import topass from "../../assets/icon_topass.png"
import share from "../../assets/icon_share.png"
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
import banner from "../../assets/banner.png"

import { UserService } from '../../service/UserService';

// import { model } from '../../model/model';
import { UIUtil } from '../../utils/UIUtil';


interface HomeCProps {
    history: History
    location: Location
}

interface HomeCState {
    selectedTab: "HomeTab"|"MyTab",
    userInfo: any,
    list: any,
    index: number,
    levelupF: any,
    friends: any,
    showKey: boolean,
    isFollow: boolean,
    banners:any,
    imgHeight:string,
}
const pageheight = window.innerHeight-95;
export class HomeC extends React.Component<HomeCProps, HomeCState> {
    rData: any
    lv: any
    avatarInput: any
    inapp?: string
    min:number
    max:number
    interva: any
    constructor(props: HomeCProps) {
        super(props)
         //   const dataSource = new ListView.DataSource({
        //     rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
        //   });
        this.state = {
            selectedTab: "HomeTab",
            userInfo:'',
            levelupF: [],
            banners:[],
            list: [],
            friends: [{img_path:defaults,name:'谁谁谁',level:'2'}],
            index: 0,
            showKey: false,
            isFollow: false,
            imgHeight:'1',
        }
    }
    getBanner = () => {
        UserService.Instance.banner().then( (res) => {
            console.log(res)
            this.setState({
                banners:res.data?res.data:[{img_path:banner}]
            })
        }).catch( err => {
            UIUtil.showError(err)
            this.setState({
                banners:[{img_path:banner}]
            })
        })
    }
    onTapHomeMenu = (e:any) => {
        console.log(e.currentTarget.dataset.id)
        let index = e.currentTarget.dataset.id;
        console.log("onTapHomeMenu", index)
        if (index == 0) {
            if (this.state.userInfo.level == 0) {
                UIUtil.showInfo("暂未开通");
            } else {
                this.props.history.push("/registeredC");
            }
        } else if (index == 1) {
            //关注列表
            UserService.Instance.focusFriendsListC().then( res => {
                let levelupF = [];
                console.log(res)
                levelupF = res;
                    levelupF.map((res:any)=>{
                        res.follow?'':res.follow = 0;
                })
                console.log(levelupF)
                this.setState({
                        ...this.state,
                        levelupF:levelupF
                })
                this.setState({ showKey: true });
            }).catch ( err => {
                UIUtil.showError(err)
            })
        } else if (index == 2) {
            this.props.history.push("/friendsUnC");
        } else if (index == 3) {
            this.props.history.push("/share");
        }
    }
    onClose = () => {
        this.setState({
            showKey: false
        })
    }
    //关注
    onFollow = (e:any) => {
        let id = e.currentTarget.dataset.id;
        let levelupF = this.state.levelupF;
        for(let i of levelupF){
            if(id == i.id && i.status != '1'){
                return;
            }
        }
        UserService.Instance.focusFriendsC(id).then( avatarUrl => {
            let levelupF = this.state.levelupF;
            levelupF.map((res:any)=>{
                if(id == res.id){
                    res.status = '0'
                }
            })
            this.setState({
                levelupF:levelupF
            })
        }).catch( err => {
            UIUtil.showError(err)
        })
    }
    //登出
    onLogout = () => {
        UserStorage.clearAccessToken();
        this.props.history.push("/login");
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
            console.log(avatarUrl)
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
    getUserInfo = () => {
        UserService.Instance.getUserInfoC().then( userInfo => {
            this.setState({
                ...this.state,
                userInfo: userInfo
            })
        }).catch ( err => {
            console.log(err.errmsg)
        })
    }
    public componentDidUpdate() {

    }
    public componentWillMount() {
        
    }
    public componentDidMount() {
        let tab: "HomeTab"|"MyTab" = UserStorage.getCookie('type') == 'MyTab'?'MyTab':'HomeTab'
        this.setState({
            selectedTab: tab
        })
        UserStorage.setCookie('typepage','C');
        this.getBanner();
        this.getUserInfo();
    }
    

    public render() {
        let list = [];
        if(this.state.levelupF.length != 0){
            for(var i=0;i<this.state.levelupF.length;i++){
                list.push( 
                <div className="index_modal_list" key={i}>
                <div className="head_img">
                    <img src={this.state.levelupF[i].head_imgurl != ''?this.state.levelupF[i].head_imgurl:defaults} />
                </div>
                <div className="friends_info">
                    <div className="text">{this.state.levelupF[i].nickname != ''?this.state.levelupF[i].nickname:''}</div>
                    <div className="text">{this.state.levelupF[i].mobile != ''?this.state.levelupF[i].mobile:'0'}</div>
                    <div className="text">{this.state.levelupF[i].wechat_number != ''?this.state.levelupF[i].wechat_number:''}</div>
                    <div className="text">
                        <div className="level_img">
                            <img src={king} alt=""/>
                        </div>
                        <span>{this.state.levelupF[i].level != ''?this.state.levelupF[i].level:'0'}等级</span>
                    </div>
                    {/* <div className="text">{this.state.levelupF[i].user_type != '1'?'网B':'网A'}</div> */}
                    <div className="text index_follow" data-id={this.state.levelupF[i].id} onClick={this.onFollow}>
                        <div className="level_img">
                            <img src={this.state.levelupF[i].status != '1'?follow:follow_n} alt=""/>
                        </div>
                        <span>{this.state.levelupF[i].status != '1'?this.state.levelupF[i].status != '3'?'待确认':'已关注':'未关注'}</span>
                    </div>
                </div>
            </div>
            )
            }
        }
        
        let friendsList = [];
        if(this.state.list.length != 0){
            for(var i=0;i<this.state.list.length;i++){
                friendsList.push(

            <List className="my-list">
                <List.Item thumb={this.state.list[i].head_imgurl!=''?this.state.list[i].head_imgurl:defaults} extra={this.state.list[i].time}>{this.state.list[i].nickname}</List.Item>
            </List>
                    // <div className="friend_list" key={i} data-id={this.state.list[i].userid} data-token={accessToken} onClick={(e:any)=>{
                    //     window.location.href="https://dev170.weibanker.cn/chenjj/www/im/im.html?userid="+e.currentTarget.dataset.id+"&assToken="+e.currentTarget.dataset.token;
                    //     }}>
                    //     <div className="head_img">
                    //         <img src={this.state.list[i].head_imgurl != ''?this.state.list[i].head_imgurl:defaults} />
                    //     </div>
                    //     <div className="friends_info">
                    //         <div className="name">{this.state.list[i].nickname != ''?this.state.list[i].nickname:'某某某'}</div>
                    //         <div className="level">
                    //             <div className="level_img">
                    //                 <img src={king} alt=""/>
                    //             </div>
                    //             <span>{this.state.list[i].level != ''?this.state.list[i].level:'0'}等级</span>
                    //         </div>
                    //     </div>
                    // </div>
                )
            }
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
                    <NavBar className={this.state.selectedTab === 'HomeTab' ?'home-navbar':'none'} >{this.state.selectedTab === 'HomeTab' ?'首页':'个人中心'}</NavBar>
                        <TabBar unselectedTintColor="#B8B8BA" tintColor="#000000" barTintColor="#fff" tabBarPosition="bottom">
                            <TabBar.Item title="首页" key="HomeTab" 
                                selected={this.state.selectedTab === 'HomeTab'}
                                onPress={
                                    () => {
                                        this.setState({
                                            ...this.state,
                                            selectedTab: "HomeTab"
                                        })
                                        UserStorage.setCookie('type','HomeTab');
                                        this.props.history.push("#HomeTab");
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
                               <div className="home-banner">
                                    <Carousel autoplay dots>
                                        {this.state.banners.map((val:any, index:string) => (
                                            <a
                                            key={index}
                                            href={val.link}
                                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                            >
                                            <img
                                                src={val.img_path}
                                                alt={val.title}
                                                style={{ width: '100%',height: '1.8rem' , verticalAlign: 'top' }}
                                                onLoad={() => {
                                                window.dispatchEvent(new Event('resize'));
                                                    this.setState({ imgHeight: '1.8rem' });
                                                }}
                                            />
                                            </a>
                                        ))}
                                    </Carousel>
                                </div>
                                <div className="tab">
                                    <div className="" onClick={()=>{this.props.history.push("/homeB");}}>店小二</div>
                                    <div className="" onClick={()=>{this.props.history.push("/home");}}>小掌柜</div>
                                    <div className="tabC">大掌柜</div>
                                </div>    
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
                                            <img src={share} alt=""/>
                                        </div>
                                    </div>
                                </List>

                                    
                                    {/* <List className="bg_w"><List.Item>交友记录</List.Item></List>
                                    <List className="index_friends_list bg_w">
                                        {friendsList}
                                    </List> */}
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
                                        UserStorage.setCookie('type','MyTab');
                                        this.getUserInfo()
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
                                <div className="my_bg" style={{height:pageheight+45}}>
                                    <div className="my_title">个人中心</div>
                                    <div className="my_content">
                                        <div className="my_haed">
                                            <input className="my_haed_input" type="file" onChange={this.onAvatarChange}/>
                                            <img className="my_logo" src={this.state.userInfo && this.state.userInfo.head_imgurl}/>
                                        </div>
                                        <div className="my_info_container">
                                            <div className="my_nickname">{this.state.userInfo && this.state.userInfo.nickname}</div>
                                            <div className="my_phone">{this.state.userInfo && this.state.userInfo.mobile}</div>
                                            <div className="my_level">
                                                <img src={king} alt=""/>
                                                <span>{this.state.userInfo && this.state.userInfo.level}等级</span>
                                            </div>
                                        </div>
                                        <div className="my_info_friends after">
                                            <div className="my_friends" onClick={()=>{this.props.history.push("/friendListC")}}>
                                                <div>我的好友</div>
                                                <div>{this.state.userInfo && this.state.userInfo.friends_count}</div>
                                            </div>
                                            <div className="my_friends" onClick={()=>{this.props.history.push("/friendsUnC")}}>
                                                <div>待通过</div>
                                                <div>{this.state.userInfo && this.state.userInfo.stay_by}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <List renderHeader={() => ''} className="profile_list">
                                        <List.Item
                                            thumb= {my_friends}
                                            arrow="horizontal"
                                            onClick={()=>{this.props.history.push("/friendListC")}}
                                            >我的好友
                                        </List.Item>
                                        <List.Item
                                            thumb= {my_topass}
                                            onClick={()=>{this.props.history.push("/friendsUnC")}}
                                            arrow="horizontal"
                                            >待通过
                                        </List.Item>
                                        <List.Item
                                            thumb= {my_topass}
                                            onClick={()=>{this.props.history.push("/friendsLogC")}}
                                            arrow="horizontal"
                                            >交友记录
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
                                                    { text: '是', onPress: () => {this.onLogout()} },
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
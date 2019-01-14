import * as React from 'react';
// import ReactDOM from "react-dom";
import { NavBar, Icon, ListView, Modal } from "antd-mobile";
import { History } from "history";
import { UserService } from '../../service/UserService';
// import { UIUtil } from '../../utils/UIUtil';
import { model } from '../../model/model';
import king from "../../assets/my_VIP.png";
import defaults from "../../assets/default.png";
import { Redirect } from "react-router-dom";
let tab: "HomeTab"|"MyTab";
interface friendsUnBProps {
    history: History
}


interface friendsUnBState {
    height: number,
    dataSource: any,
    isLoading: boolean,
    hasMore: boolean,
    page: number,
    total_num: number,
    list_num: number,
    unFriend: any,
    redirectToLogin: boolean
}
const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';

export class friendsUnB extends React.Component<friendsUnBProps, friendsUnBState> {
    rData: any
    lv: any

    constructor(props: friendsUnBProps) {
        super(props);
        
          const dataSource = new ListView.DataSource({
            rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
          });
          this.state = {
            height:  document.documentElement.clientHeight - 200,
            dataSource,
            isLoading: false,
            hasMore: false,
            page: 1,
            total_num: 1,
            list_num: 1,
            unFriend:[],
            redirectToLogin: false

          };
        
    }
    onRedirectBack = () => {
        this.setState({
            ...this.state,
            redirectToLogin: true
        })
    }
    onEndReached = (event:any) => {
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        if (!this.state.isLoading && this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        this.getFriends()
    }
    getFriends = () => {

    }
    getUnFriend = () => {
        UserService.Instance.checkFriendsListB().then( list => {
            let lists:any = [];
            list.map((res:any)=>{
                lists.push(res)
            })
            this.setState({
                unFriend: lists,
                dataSource: this.state.dataSource.cloneWithRows(lists),
                isLoading: false,
                hasMore: false,
                total_num: list.total_num,
                list_num: this.state.list_num + list.length*1,
                page: this.state.page*1+1
            })
        }).catch ( err => {
            
        })
    }
    checkFriend = (e:any) => {
        let id = e.currentTarget.dataset.id;
        let name = e.currentTarget.dataset.name;
        UserService.Instance.checkFriends(id).then( () => {
            const alert = Modal.alert
            alert('提示','已接受好友'+name,[
                { text: '是', onPress: () => {this.getUnFriend()} },
            ])
        }).catch ( err => {
            
        })
    }
    componentDidMount() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = {type:''};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        tab = theRequest.type == 'MyTab'?'MyTab':'HomeTab';
        this.getUnFriend();
    }

    public render() {
        const { redirectToLogin} = this.state
    
        if (redirectToLogin) {
            const to = {
                pathname: "/homeB?type="+tab
            }
            return <Redirect to={to} />
        }
        const separator = (sectionID: number, rowID: number) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F5',
                height: 1,
              }}
            />
        );
  
        const row = (rowData: model.FriendsList, sectionID: number, rowID: number) => {
            return (
                <div className="friend_list">
                    <div className="head_img">
                        <img src={rowData.head_imgurl?rowData.head_imgurl:defaults} />
                    </div>
                    <div className="friends_info">
                        <div className="name">{rowData.nickname?rowData.nickname:'某某某'}</div>
                        <div className="level">
                            <div className="level_img">
                                <img src={king} alt=""/>
                            </div>
                            <span>{rowData.level?rowData.level:'0'}等级</span>
                        </div>
                    </div>
                    <div className="friends_accept">
                        <button data-id={rowData.id} data-name={rowData.nickname} onClick={this.checkFriend}>接受</button>
                    </div>
                </div>
            );
        };
        return (
            <div className="message-container">
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">待通过</div>
                </NavBar>
                <div style={{height: bodyHeight, backgroundColor: '#f5f5f5' }}>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : ''}
                        </div>)}
                        renderRow={row}
                        renderSeparator={separator}
                        className="am-list"
                        pageSize={4}
                        onScroll={() => { console.log('scroll'); }}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                    />
                </div>
            </div>
        )
    }
}
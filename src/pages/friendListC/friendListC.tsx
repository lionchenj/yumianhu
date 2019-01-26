import * as React from 'react';
import { Redirect } from "react-router-dom";
// import ReactDOM from "react-dom";
import {  ListView} from "antd-mobile";
import { History } from "history";
import { UserStorage } from "../../storage/UserStorage";
// import { UserService } from '../../service/UserService';
// import { UIUtil } from '../../utils/UIUtil';
import { model } from '../../model/model';
// import king from "../../assets/my_VIP.png";
// import defaults from "../../assets/default.png";






interface friendListCProps {
    history: History
}


interface friendListCState {
    tabIndex:number,
    height: number,
    visible: boolean
    dataSource: any,
    isLoading: boolean,
    hasMore: boolean,
    page: number,
    total_num: number,
    list_num: number,
    tabs:any,
    coins:any,
    redirectToLogin: boolean

}
let width = window.innerWidth;
let height = window.innerHeight;
// const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';
export class friendListC extends React.Component<friendListCProps, friendListCState> {
    rData: any
    lv: any

    constructor(props: friendListCProps) {
        super(props);
        
          const dataSource = new ListView.DataSource({
            rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
          });
          this.state = {
            height:  document.documentElement.clientHeight - 200,
            visible: false,
            dataSource,
            isLoading: false,
            hasMore: false,
            page: 1,
            total_num: 1,
            list_num: 1,
            tabs:[],
            coins:[],
            tabIndex:0,
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
        // if (this.state.isLoading && !this.state.hasMore) {
        //   return;
        // }
        // if (!this.state.isLoading && this.state.hasMore) {
        //     return;
        // }
        // this.setState({ isLoading: true });
        // this.getFriends()
    }
    getFriends = () => {

    }
    componentDidMount() {
        // UserService.Instance.myFriendsListRecord().then( list => {
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(list),
        //         isLoading: false,
        //         hasMore: false,
        //         total_num: list.total_num,
        //         list_num: this.state.list_num + list.length*1,
        //         page: this.state.page*1+1
        //     })
        // }).catch ( err => {
            
        // })
        
    }

    public render() {
        const { redirectToLogin} = this.state
    
        if (redirectToLogin) {
            const to = {
                pathname: "/home3"
            }
            return <Redirect to={to} />
        }
        // const separator = (sectionID: number, rowID: number) => (
        //     <div
        //       key={`${sectionID}-${rowID}`}
        //       style={{
        //         backgroundColor: '#F5F5F5',
        //         height: 1,
        //       }}
        //     />
        // );
  
        // const row = (rowData: model.FriendsList, sectionID: number, rowID: number) => {
        //     let token = UserStorage.getCookie("User.AccessTokenKey");
        //     return (
        //         <div className="friend_list" data-id={rowData.userid} onClick={
        //             (e:any)=>{
        //                 window.location.href="https://dev170.weibanker.cn/chenjj/www/im/im.html?userid="+e.currentTarget.dataset.id+"&assToken="+token
        //             }
        //         }>
        //             <div className="head_img">
        //                 <img src={rowData.head_imgurl?rowData.head_imgurl:defaults} />
        //             </div>
        //             <div className="friends_info">
        //                 <div className="name">{rowData.nickname?rowData.nickname:'某某某'}</div>
        //                 <div className="level">
        //                     <div className="level_img">
        //                         <img src={king} alt=""/>
        //                     </div>
        //                     <span>{rowData.level?rowData.level:'0'}等级</span>
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // };
        const accessToken = UserStorage.getCookie("User.AccessTokenKey");
        return (
            <div className="message-container">
                {/* <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">我的好友</div>
                </NavBar> */}
                <div className="iframe-tab-1">
                    <iframe src={true? "http://www.shuaishou123.com/im/listC.html?assToken="+accessToken:"https://dev170.weibanker.cn/chenjj/www/im/listC.html?assToken="+accessToken}
                            height={height}
                            width={width}
                            scrolling="0"
                    ></iframe>
                </div>
                {/* <div style={{height: bodyHeight, backgroundColor: '#f5f5f5' }}>
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
                            height: bodyHeight,
                            overflow: 'auto',
                        }}
                    />
                </div> */}
            </div>
        )
    }
}
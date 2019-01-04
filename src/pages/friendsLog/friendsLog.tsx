import * as React from 'react';
// import ReactDOM from "react-dom";
import { NavBar, Icon, ListView, List} from "antd-mobile";
import { History } from "history";
import { UserService } from '../../service/UserService';
// import { UIUtil } from '../../utils/UIUtil';
import { model } from '../../model/model';
import defaults from "../../assets/default.png";





interface friendsLogProps {
    history: History
}


interface friendsLogState {
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
    coins:any
}
const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';

export class friendsLog extends React.Component<friendsLogProps, friendsLogState> {
    rData: any
    lv: any

    constructor(props: friendsLogProps) {
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
            tabIndex:0
          };
        
    }
    onRedirectBack = () => {
        const history = this.props.history
        history.goBack()
    }
    onEndReached = (event:any) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
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
    onAccept = () => {

    }
    componentDidMount() {
        UserService.Instance.myFriendsList().then( list => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(list),
                isLoading: false,
                hasMore: false,
                total_num: list.total_num,
                list_num: this.state.list_num + list.length*1,
                page: this.state.page*1+1
            })
        }).catch ( err => {
            
        })
    }

    public render() {
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
                <List className="my-list">
                    <List.Item thumb={rowData.head_imgurl!=''?rowData.head_imgurl:defaults} extra={rowData.time}>{rowData.nickname}</List.Item>
                </List>
            );
        };
        return (
            <div className="message-container friendsLog">
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">交友记录</div>
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
import * as React from 'react';
// import ReactDOM from "react-dom";
import { NavBar, Icon, } from "antd-mobile";
import { History } from "history";
import { Redirect } from "react-router-dom";
import { UserStorage } from "../../storage/UserStorage";

// import { UserService } from '../../service/UserService';ListView,Tabs
// import { UIUtil } from '../../utils/UIUtil';
// import { model } from '../../model/model';






interface datingrecordProps {
    history: History
}


interface datingrecordState {
    tabIndex:number,
    height: number,
    visible: boolean
    // dataSource: any,
    isLoading: boolean,
    hasMore: boolean,
    page: number,
    total_num: number,
    list_num: number,
    tabs:any,
    coins:any,
    redirectToLogin: boolean

}
const bodyHeight = (window.innerHeight/100 - 0.45) + 'rem';
export class datingrecord extends React.Component<datingrecordProps, datingrecordState> {
    rData: any
    lv: any

    constructor(props: datingrecordProps) {
        super(props);
        
        //   const dataSource = new ListView.DataSource({
        //     rowHasChanged: (row1: model.TransactionItem, row2: model.TransactionItem) => row1 !== row2,
        //   });
          this.state = {
            height:  document.documentElement.clientHeight - 200,
            visible: false,
            // dataSource,
            isLoading: true,
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

    componentDidMount() {
    }

    public render() {
        const { redirectToLogin} = this.state
        let typepage = UserStorage.getCookie('typepage')||'';    
        if (redirectToLogin) {
            const to = {
                pathname: "/home"+typepage
            }
            return <Redirect to={to} />
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
  
        //   const row = (rowData: model.exChangeRecordItem, sectionID: number, rowID: number) => {
     
        //     return (
                // <div className="friend_list">
                    //     <div className="head_img">
                    //         <img src={i.img_path?i.img_path:defaults} />
                    //     </div>
                    //     <div className="friends_info">
                    //         <div className="name">{i.name?i.name:'某某某'}</div>
                    //         <div className="time">
                    //             <span>{i.time?i.time:'0'}</span>
                    //         </div>
                    //     </div>
                    // </div>
        //     );
        //   };
        return (
            <div className="message-container">
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">我的好友</div>
                </NavBar>
                <div style={{height:bodyHeight}}></div>
                {/* <Tabs tabs={tabs} onTabClick={(tab, index) => { this.setState({tabIndex:index})}}>
                        <div style={{height: bodyHeight, backgroundColor: '#f5f5f5' }}>
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource1}
                            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading1 ? 'Loading...' : ''}
                            </div>)}
                            renderRow={row1}
                            renderSeparator={separator1}
                            className="am-list"
                            pageSize={4}
                            // useBodyScroll
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
                            // useBodyScroll
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
                    </Tabs>
                <div className="fans-list-view-container">
                
                </div> */}
            </div>
        )
    }
}
import * as React from 'react';
// import ReactDOM from "react-dom";
import { NavBar, Icon} from "antd-mobile";
import { History } from "history";
// import { UserService } from '../../service/UserService';
// import { UIUtil } from '../../utils/UIUtil';
// import { model } from '../../model/model';






interface undeterminedProps {
    history: History
}


interface undeterminedState {
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
    coins:any
}

export class undetermined extends React.Component<undeterminedProps, undeterminedState> {
    rData: any
    lv: any

    constructor(props: undeterminedProps) {
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
            tabIndex:0
          };
        
    }
    onRedirectBack = () => {
        const history = this.props.history
        history.goBack()
    }

    componentDidMount() {
    }

    public render() {
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
            <div className="message-container">
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={this.onRedirectBack}
                    className="home-navbar" >
                    <div className="nav-title">待通过</div>
                </NavBar>
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
import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {gethomeInfo,setadd,del} from "../../actions/home"
import * as consts from '../../const/index'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import "./css/home.css"

class Home extends Component {
    componentDidMount () {
       const {dispatch} = this.props
       dispatch(gethomeInfo())
    }
    toArticle (item) {
        browserHistory.push({pathname: `/home/${item.title}`,state: {...item}})
    }
    render () {
        const {data,dispatch,add,check} = this.props
        return (
            <div>
                <h1 id="postBar_hr"><span id="postBar">贴吧</span>
                    {/*<span className="add" onClick={() => {
                        dispatch({type: consts.SHOW_HOME_ADD})
                    }}>+</span>*/}
                    <div className="add">
                        <FloatingActionButton  mini={true} onTouchTap={() => {
                            dispatch({type: consts.SHOW_HOME_ADD})
                        }} >
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </h1>
                <hr />
                <Dialog
                    title="请输入评论信息"
                    actions={[ <FlatButton
                        label="确认"
                        primary={true}
                        onTouchTap={() => {dispatch(setadd())}}
                    />,
                    <FlatButton
                        label="取消"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={() => {dispatch({type: consts.HIDE_HOME_ADD})}}
                    />]}
                    modal={false}
                    open={add.open}
                    onRequestClose={() => {dispatch({type: consts.HIDE_HOME_ADD})}}
                >
                    <div>
                        {check.show && (<div style={{color: 'red'}}>{check.message}</div>)}
                        <form
                            id="form"
                            onReset={() => { dispatch({type: consts.HIDE_HOME_ADD})}}
                        >
                             <input type="hidden" value={add.input.id} />
                            <Paper zDepth={2}>
                                <TextField hintText="用户名" underlineShow={false}
                                    value={add.input.username} onChange={
                                   (e) => {dispatch({type: consts.CHANGE_ADD_INFO,info: {key: "username",value: e.target.value}})}}
                                 />
                                <Divider />
                                <TextField hintText="标题"  underlineShow={false}
                                     value={add.input.title} onChange={
                                   (e) => {dispatch({type: consts.CHANGE_ADD_INFO,info: {key: "title",value: e.target.value}})}}
                                 />
                                <Divider />
                                <h3>请输入内容</h3>
                                <div id="contentinput" contentEditable={true} onSelect={(e) => {dispatch({type: consts.CHANGE_ADD_INFO,info: {key: "content",value: e.target.innerText}})}}></div>
                                <Divider />
                            </Paper>                    
                        </form>
                    </div>
                </Dialog>
                {console.log(data.length)}
                {data.length ? (
                    <div id="list">
                        {data.map((item,index) => {
                            return (
                                <div className="list_item" key={index}>
                                    <span className="item_clone" onClick={() => {dispatch(del(item.id))}} >x</span>
                                    <div onClick={() => this.toArticle(item)} className="header">
                                        <h1>{item.title}</h1>
                                        <hr />
                                        <div><span>{item.username} : {item.createTime}</span></div>
                                    </div>
                                    <div className="content">{item.content.length > 100 ? `${item.content.substr(0,100)}.........` : item.content }</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (<h4>暂无数据</h4>)}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return state.home
}
export default connect(mapStateToProps)(Home)
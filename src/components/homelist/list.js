import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {gethomelistInfo,addComment} from '../../actions/homelist'
import RaisedButton from 'material-ui/RaisedButton';
import * as consts from '../../const/index'
import "./css/list.css"

class HomeList extends Component {
    handleScroll(e) {
        const {homelist: {list}} = this.props
        if(list.length) {
            if (e.wheelDelta === 120) {
                this.props.dispatch({type: consts.SCROLLBAR_LISTENING, info:{type: "+",
                    height: window.getComputedStyle(this.refs.commentul, null)['height'],
                    showheight: window.getComputedStyle(this.refs.comment, null)['max-height']
                }})
            } else {         
                    this.props.dispatch({type: consts.SCROLLBAR_LISTENING, info:{type: "-",
                        height: window.getComputedStyle(this.refs.commentul, null)['height'],
                        showheight: window.getComputedStyle(this.refs.comment, null)['max-height']
                    }})            
            }
        }
    }
    componentDidMount() {
        const {dispatch,location: {state}} = this.props
        dispatch(gethomelistInfo(state.id))
        window.addEventListener('wheel', this.handleScroll.bind(this),false);
    }
    render () {
        const {homelist: {list,add,input,margin,message},location: {state},dispatch} = this.props
        return (
            <div id="list_warp">
                <Card>
                    <div className="handinfo">
                        <CardTitle title={<span>{state.title}</span>} subtitle={
                            <div id="info"><span className="username">用户名:{state.username}</span><span className="createTime">创建时间:{state.createTime}</span></div>} />
                        <CardText>
                            <div id="list_content">
                                {state.content}
                            </div>
                            <div className="list_btn">
                                <RaisedButton onTouchTap={() => dispatch({type: consts.SHOW_HOME_LIST_ADD_MODULE})} label="回复" />
                            </div>
                        </CardText>
                    </div>
                    <div ref="comment" id="comment">
                        <ul style={{marginTop: margin}} ref="commentul">
                            {list.map((item,index) => (
                                <li key={index}>
                                    <div className="comment_info"><span>{item.uesrname}</span><span>{item.createTime}</span></div>
                                    <div className="comment_content">{item.content}</div>                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
                <Dialog
                    title="请输入评论信息"
                     actions={[ <FlatButton
                        label="确认"
                        primary={true}
                        onTouchTap={() => {dispatch(addComment(state.id))}}
                    />,
                    <FlatButton
                        label="取消"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={() => {dispatch({type: consts.HIDE_HOME_LIST_ADD_MODULE})}}
                    />]}
                    modal={false}
                    open={add.open}
                    onRequestClose={() => {dispatch({type: consts.HIDE_HOME_LIST_ADD_MODULE})}}
                >
                    {message.show && (<div style={{color: "red",textAlign: 'center'}}>{message.info}</div>)}
                    <TextField
                        hintText="用户名"
                        floatingLabelText="请输入用户名不能为空"
                        floatingLabelFixed={true}
                        value={input.uesrname}
                        onChange={(e) => dispatch({type: consts.CHANGE_HOME_LIST_INPUT_INFO,info: {key: "uesrname",value: e.target.value}})}
                    />
                     <TextField
                        hintText="内容"
                        floatingLabelText="请输入内容不能为空"
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                        value={input.content}
                        onChange={(e) => dispatch({type: consts.CHANGE_HOME_LIST_INPUT_INFO,info: {key: "content",value: e.target.value}})}                        
                      />
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return state
}
export default connect(mapStateToProps)(HomeList)
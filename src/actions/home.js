import * as http from '../utils/http';
import * as consts from '../const'
import notie from 'notie';

export function gethomeInfo() {
    return (dispatch,getState) => {
        return http.get(consts.GET_HOME_API)
            .then(data => {
                dispatch({type: consts.GET_HOME_INFO,data})
             })
    }
}

export function setadd() {
    return (dispatch,getState) => {
        const {home:{add:{input}}} = getState();
        let yz = Object.keys(input).filter(key => {
            return  input[key] === ""
        });
        if(yz.length) {
            dispatch({type: consts.CHECK_INFO,message: "用户名标题内容不能为空"})
            return Promise.resolve();
        }
        return http.post(consts.HOME_ADD_API,input)
            .then(data => {
                dispatch({type: consts.HIDE_HOME_ADD})
                gethomeInfo()(dispatch,getState)
             })
    }
}

export function del(id) {
    return (dispatch,getState) => {
        return http.get(`${consts.HOME_DEL_API}/${id}`)
            .then(data => {
                gethomeInfo()(dispatch,getState)
             })
    }
}
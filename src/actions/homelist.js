import * as consts from "../const/index"
import * as http from '../utils/http'

export function gethomelistInfo(id) {
    return (dispatch,getState) => {
        return http.get(`${consts.GET_HOME_LIST_API}?id=${id}`)
            .then(list => {
                dispatch({type: consts.GET_HOME_LIST_INFO,list})
             })
    }
}

export function addComment(id) {
    return (dispatch,getState) => {
        const {homelist:{input}} = getState()
        let yz = Object.keys(input).filter(key => {
            return  input[key] === ""
        });
        if(yz.length) {
            dispatch({type: consts.CHECK_COMMENT_INFO,message: "用户名内容不能为空"})
            return Promise.resolve();
        }
        return http.post(`${consts.ADD_HOME_LIST_API}`,{...input,id})
            .then(data => {
                gethomelistInfo(id)(dispatch,getState)
                dispatch({type: consts.HIDE_HOME_LIST_ADD_MODULE})
             })
    }
}
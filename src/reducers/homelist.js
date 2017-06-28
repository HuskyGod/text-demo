import * as consts from '../const/index'
import dateForm from '../utils/dateForm';
export default function Reducer (state = {
    list: [],
    add: {
        open: false
    },
    margin: 0,
    input: {
        uesrname: "",
        content: "",
        createTime: dateForm(new Date()),
    },
    message: {
        show: false,
        info: "",
    }
},action) {
    switch(action.type) {
        case consts.GET_HOME_LIST_INFO :
            return {...state,list:action.list};
        case consts.SHOW_HOME_LIST_ADD_MODULE: {
            return {...state,add: {...state.add,open: true}}
        }
        case consts.HIDE_HOME_LIST_ADD_MODULE: {
            return {...state,add: {...state.add,open: false}}
        }    
        case consts.CHANGE_HOME_LIST_INPUT_INFO: {
            return {...state,input: {...state.input,[action.info.key]: action.info.value}}
        }
        case consts.CHECK_COMMENT_INFO: {
            return {...state,message: {show: true,info: action.message}}
        }
        case consts.SCROLLBAR_LISTENING: {
            console.log(state.margin,parseInt(action.info.height))
            if (state.margin >= 0 || state.margin <= parseInt(action.info.height)) {
                if(action.info.type === "+"){
                    if(state.margin + 120 > 0){
                        return {...state,margin: 0}                        
                    }
                    return {...state,margin: state.margin+120}
                } else {       
                    if(state.margin - 120  < -(parseInt(action.info.height) - parseInt(action.info.showheight))){
                        return {...state,margin: -(parseInt(action.info.height) - parseInt(action.info.showheight)) }                        
                    }     
                    return {...state,margin: state.margin-120}                
                }
            }
            return state
        }
        default:
            return state;    
    }
}
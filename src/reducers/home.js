import * as actions from '../const/index';
import dateForm from '../utils/dateForm';

const initialState = {
    data: [],
    add:{
        input: {
            id:Math.round(Math.random() * 10)+(new Date().getTime()),
            content: "",
            title: "",
            username: "",
            createTime: dateForm(new Date()),
        },
        open: false
    },
    check: {
            show: false,
            message: ""
    },
}

export default function Reducer (state = initialState,action) {
    switch (action.type) {
        case actions.GET_HOME_INFO : 
            return {...state,data:action.data,check: {...state.check,show: false}};
        case actions.SHOW_HOME_ADD : 
            return {...state,add:{...state.add,open: true}};
        case actions.HIDE_HOME_ADD : 
            return {...state,add:{...initialState.add,open: false}}
        case actions.CHANGE_ADD_INFO : 
            return {...state,add: {...state.add,input:{...state.add.input,[action.info.key]: action.info.value}}}
        case actions.CHECK_INFO : 
            return {...state,check: {show: true,message: action.message}}
        default :
            return state;    
    }
}
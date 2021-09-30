import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload } // ...는 스프레드오퍼레이터라고 하여, 그냥 그대로 가져온다는 이야기.
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload  }
            break;    
    
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;
    
        default:
            return state;
    }
}
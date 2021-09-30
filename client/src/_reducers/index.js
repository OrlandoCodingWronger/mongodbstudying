// 스토어 안에는 기능에 따라 여러 리듀서가 있는데, 콤바인리듀서를 사용하여 루트 리듀서에서 하나로 합쳐줌.
import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers({
    user,
})

export default rootReducer;
import {combineReducers} from "redux";
import batReducer from "./batReducer"
import ballReducer from "./ballReducer"

const rootReducer = combineReducers({
    bat:batReducer,
    ball:ballReducer
})

export default rootReducer;
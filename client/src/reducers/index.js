import { combineReducers } from "redux";
import userReducer from './user.reducer';
import usersReducer from "./users.reducer";
import directoryReducer from "./directory.reducer";
import fileReducer from "./file.reducer";


export default combineReducers({
    userReducer,
    usersReducer,
    directoryReducer,
    fileReducer
})
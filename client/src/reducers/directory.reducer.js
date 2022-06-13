import { GET_DIRECTORIES } from "../actions/directory.actions";


const initialState = {};

export default function directoryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DIRECTORIES:
            return action.payload;
         
        default: 
            return state;
    }

}
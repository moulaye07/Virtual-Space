import { GET_FILES } from "../actions/file.actions";

const initialState = {};

export default function fileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FILES:
            return action.payload;
         
        default: 
            return state;
    }

}
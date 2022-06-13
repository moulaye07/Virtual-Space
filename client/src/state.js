import {createGlobalState} from "react-hooks-global-state";

const {setGlobalState, useGlobalState} = createGlobalState({
    parent:null
});
export {useGlobalState, setGlobalState};
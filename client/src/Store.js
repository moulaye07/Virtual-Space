import React, { useState } from "react";

const initialState = {
    createUser: false
};

export const ContextParent = React.createContext();

const Store = ({ children }) => {
    const [state, setState] = useState(initialState);

    return (
        <ContextParent.Provider value={[state, setState]} >{children}</ContextParent.Provider>
    )
}

export default Store;
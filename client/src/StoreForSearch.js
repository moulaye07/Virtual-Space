import React, { useState } from "react";

const initialState = {
    query: null
};

export const ContextSearch = React.createContext();

const StoreForSearch = ({ children }) => {
    const [queryState, setQueryState] = useState(initialState);

    return (
        <ContextSearch.Provider value={[queryState, setQueryState]} >{children}</ContextSearch.Provider>
    )
}

export default StoreForSearch;
import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();
const AppDispatchContext = createContext();
const initialState = {
    chainId: null,
    blockNumber: null,
};

function appReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case 'UPDATE_CHAIN_ID': {
            const { chainId } = payload;
            return {
                ...state,
                chainId
            };
        }
        case 'UPDATE_BLOCK_NUMBER': {
            const { blockNumber } = payload;
            return {
                ...state,
                blockNumber
            };
        }
        default:
            throw new Error(`Could not handle action type: ${type}`);
    }
}

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};

function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
}

function useAppDispatch() {
    const context = useContext(AppDispatchContext);
    if (!context) {
        throw new Error('useAppDispatch must be used within a AppProvider');
    }
    return context;
}

export { AppProvider, useAppContext, useAppDispatch };

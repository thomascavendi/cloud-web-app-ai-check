import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { StateLoader } from './utils/StateLoader';
import throttledMiddleware from './throttled';

// Create an instance of StateLoader to handle state persistence
const stateLoader = new StateLoader();

// Preloaded state from the state loader
const preloadedState = stateLoader.loadState();

// Set up the store with configureStore
const store = configureStore({
    reducer: rootReducer, // Root reducer for the app
    preloadedState, // Initial state loaded from stateLoader
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk, throttledMiddleware), // Add custom middleware
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production environments
});

// Subscribe to save state changes
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});

export default store;
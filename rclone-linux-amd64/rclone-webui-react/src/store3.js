import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
//import rootReducer from './reducers';
import rootReducer from './reducers/index'
import {applyMiddleware, compose} from "redux";
import {composeWithDevTools } from '@redux-devtools/extension';
import {StateLoader} from "./utils/StateLoader";
import throttledMiddleware from './throttled';

export const middleware = [thunk, throttledMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const stateLoader = new StateLoader();

//const rootReducer = (history) => ({
//  articles: articlesReducer,
//  selection: selectionReducer,
//  router: connectRouter(history)
//});

//const store = createStore(rootReducer,
//    stateLoader.loadState(),
//    composeEnhancers(
//        applyMiddleware(...middleware)
//));

//const store = configureStore({
//  reducer: createReducer,
//  // for the preloaded, if you have your initial state in diffrent file
//  // import and set it like this "preloadedState: myState"
//  preloadedState: {},
//  devTools: composeWithDevTools(),
//  // the thunk middleware will be automatically provided by getDefaultMiddleware
//  // and you dont need to import getDefaultMiddleware configureStore will handle it
//  middleware: (getDefaultMiddleware) =>   getDefaultMiddleware().concat(routerMiddleware(history)),
//});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true
})

//Function to persist store data to localStorage
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});

export default store;

//const DataProvider = ({ children }) => {
//    return (
//        <Provider store={store}>
//            {children}
//        </Provider>
//    )
//}

//export default DataProvider



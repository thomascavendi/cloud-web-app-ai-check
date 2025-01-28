import {configureStore} from '@reduxjs/toolkit';
import {applyMiddleware, createStore} from 'redux';
import checkPropTypes from 'check-prop-types';
import rootReducer from './../src/reducers';
import {middleware} from './../src/store';

export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProps = (component, expectedProps) => {
    const propsErr = checkPropTypes(component.propTypes, expectedProps, 'prop', component.name);
    return propsErr;
};

//export const testStore = (initialState) => {
//    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
//    return createStoreWithMiddleware(rootReducer, initialState);
//};

export const testStore = (initialState) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
        preloadedState: initialState,
    });
};

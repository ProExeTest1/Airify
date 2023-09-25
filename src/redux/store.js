import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer/index';

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));

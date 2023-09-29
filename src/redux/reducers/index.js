import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
import placeReducer from './placeReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
  place : placeReducer,
});

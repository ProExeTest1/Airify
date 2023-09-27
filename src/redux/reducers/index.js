import {combineReducers} from 'redux';
import dateReducer from './dateReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
});

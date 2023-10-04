import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
// <<<<<<< HEAD

// export const rootReducer = combineReducers({
//   date: dateReducer,
// =======
import placeReducer from './placeReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
  place: placeReducer,
});

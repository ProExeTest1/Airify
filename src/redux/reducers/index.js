import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
// <<<<<<< HEAD

// export const rootReducer = combineReducers({
//   date: dateReducer,
// =======
import placeReducer from './placeReducer';
import homeReducer from './homeReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
  place: placeReducer,
  OnBoarding: homeReducer,
});

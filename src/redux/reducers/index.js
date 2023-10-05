import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
// <<<<<<< HEAD

// export const rootReducer = combineReducers({
//   date: dateReducer,
// =======
import placeReducer from './placeReducer';
import searchFlightReducer from './searchFlightReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
  place: placeReducer,
  searchFlight: searchFlightReducer,
});

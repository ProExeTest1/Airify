import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
import placeReducer from './placeReducer';
import flightDetailReducer from './flightDetailReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
  place: placeReducer,
  flight : flightDetailReducer,
});

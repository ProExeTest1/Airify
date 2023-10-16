import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
import placeReducer from './placeReducer';
import searchFlightReducer from './searchFlightReducer';
import homeReducer from './homeReducer';
import SelectSeatData from './SelectSeatReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
  place: placeReducer,
  searchFlight: searchFlightReducer,
  OnBoarding: homeReducer,
  SelectSeatData: SelectSeatData,
});

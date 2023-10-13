import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
import placeReducer from './placeReducer';
import searchFlightReducer from './searchFlightReducer';
import homeReducer from './homeReducer';
import AddressReducer from './AddressReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
  place: placeReducer,
  searchFlight: searchFlightReducer,
  OnBoarding: homeReducer,
  AddressData: AddressReducer,
});

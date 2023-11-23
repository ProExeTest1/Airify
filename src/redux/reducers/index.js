import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
import placeReducer from './placeReducer';
import searchFlightReducer from './searchFlightReducer';
import homeReducer from './homeReducer';
import SelectSeatData from './SelectSeatReducer';
import userDataReducer from './userDataReducer';
import AddressReducer from './AddressReducer';
import SaveFlightReducer from './SaveFlightReducer';
import showTicketReducer from './showTicketReducer';
import BookingReducer from './BookingReducer';
import RescheduleReducer from './RescheduleReducer';
import LanguageReducer from './LanguageReducer';

export const rootReducer = combineReducers({
  date: dateReducer,
  place: placeReducer,
  OnBoarding: homeReducer,
  userData: userDataReducer,
  SelectSeatData: SelectSeatData,
  AddressData: AddressReducer,
  SaveFlight: SaveFlightReducer,
  searchFlight: searchFlightReducer,
  showTicketData: showTicketReducer,
  bookingTransactiondata: BookingReducer,
  rescheduleFlightdata: RescheduleReducer,
  languageReducer: LanguageReducer,
});

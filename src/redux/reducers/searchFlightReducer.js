import {SEARCH_FLIGHT_CARD_DATA, SEARCH_FLIGHT_FILTER_DATA} from '../type';

const INITIAL_STATE = {
  searchFlightCardData: {},
  searchFlightFilterData: {},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_FLIGHT_CARD_DATA:
      return {...state, searchFlightCardData: action?.payload};
    case SEARCH_FLIGHT_FILTER_DATA:
      return {...state, searchFlightFilterData: action?.payload};
    default:
      return state;
  }
};

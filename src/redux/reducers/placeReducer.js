import {DEPATURE_PLACE, DESTINATION_PALCE, SEARCH_FLIGHT_DATA} from '../type';

const INITIAL_STATE = {
  depaturePlace: {},
  destinationPlace: {},
  searchFlightData: {},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DEPATURE_PLACE:
      return {...state, depaturePlace: action?.payload};
    case DESTINATION_PALCE:
      return {...state, destinationPlace: action?.payload};
    case SEARCH_FLIGHT_DATA:
      return {...state, searchFlightData: action?.payload};
    default:
      return state;
  }
};

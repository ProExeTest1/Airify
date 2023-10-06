import {FLIGHT_DETAILS_DATA} from '../type';

const INITIAL_STATE = {
  flightDetails: {},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FLIGHT_DETAILS_DATA:
      return {...state, flightDetails: action?.payload};
    default:
      return state;
  }
};

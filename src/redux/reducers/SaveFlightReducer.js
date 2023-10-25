import {
  ACTIVE_FLIGHT,
  ACTIVE_FLIGHT_FILTER,
  ADDRESS_DATA,
  EXPIRE_FLIGHT,
  EXPIRE_FLIGHT_FILTER,
  OTP,
} from '../type';

const initialState = {
  activeFlight: [],
  expireFlight: [],
  activeFlightFilter: [],
  expireFlightFilter: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_FLIGHT:
      return {...state, activeFlight: action.payload};
    case EXPIRE_FLIGHT:
      return {...state, expireFlight: action.payload};
    case ACTIVE_FLIGHT_FILTER:
      return {...state, activeFlightFilter: action.payload};
    case EXPIRE_FLIGHT_FILTER:
      return {...state, expireFlightFilter: action.payload};
    default:
      return state;
  }
};

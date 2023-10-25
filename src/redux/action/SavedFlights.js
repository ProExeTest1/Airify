import {
  ACTIVE_FLIGHT,
  ACTIVE_FLIGHT_FILTER,
  EXPIRE_FLIGHT,
  EXPIRE_FLIGHT_FILTER,
} from '../type';

export const activeFlight = activeFlight => dispatch => {
  dispatch({type: ACTIVE_FLIGHT, payload: activeFlight});
};

export const expiredFlight = expiredFlight => dispatch => {
  dispatch({type: EXPIRE_FLIGHT, payload: expiredFlight});
};

export const activeFlightFilter = activeFlightFilter => dispatch => {
  dispatch({type: ACTIVE_FLIGHT_FILTER, payload: activeFlightFilter});
};

export const expiredFlightFilter = expiredFlightFilter => dispatch => {
  dispatch({type: EXPIRE_FLIGHT_FILTER, payload: expiredFlightFilter});
};

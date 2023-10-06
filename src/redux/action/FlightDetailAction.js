import { FLIGHT_DETAILS_DATA } from "../type";

export const flightDetailsAction = flightDetails => async dispatch => {
    dispatch({type: FLIGHT_DETAILS_DATA, payload: flightDetails});
  };
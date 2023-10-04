import {DEPATURE_PLACE, DESTINATION_PALCE, SEARCH_FLIGHT_DATA} from '../type';

export const depaturePlaceAction = depaturePlace => async dispatch => {
  dispatch({type: DEPATURE_PLACE, payload: depaturePlace});
};
export const destinationPlaceAction = destinationPlace => async dispatch => {
  dispatch({type: DESTINATION_PALCE, payload: destinationPlace});
};
export const SearchFlightAction = seatSearch => async dispatch => {
  dispatch({type: SEARCH_FLIGHT_DATA, payload: seatSearch});
};

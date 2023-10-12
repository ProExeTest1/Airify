import {SEARCH_FLIGHT_CARD_DATA, SEARCH_FLIGHT_FILTER_DATA} from '../type';

export const SearchFlightCardData = depaturePlace => async dispatch => {
  dispatch({type: SEARCH_FLIGHT_CARD_DATA, payload: depaturePlace});
};
export const SearchFlightFilterData = depaturePlace => async dispatch => {
  dispatch({type: SEARCH_FLIGHT_FILTER_DATA, payload: depaturePlace});
};

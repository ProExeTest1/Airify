import {SELECT_SEAT_DATA} from '../type';

export const SelectSeatActionData = data => async dispatch => {
  dispatch({type: SELECT_SEAT_DATA, payload: data});
};

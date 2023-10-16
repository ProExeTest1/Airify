import {SEILCT_SEAT_DATA} from '../type';

export const SelectSeatActionData = data => async dispatch => {
  dispatch({type: SEILCT_SEAT_DATA, payload: data});
};

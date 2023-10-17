import {ADDRESS_DATA} from '../type';

export const addressData = addressData => async dispatch => {
  dispatch({type: ADDRESS_DATA, payload: addressData});
};

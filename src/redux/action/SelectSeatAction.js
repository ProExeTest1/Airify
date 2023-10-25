import {
  DISCOUNT_DATA,
  RETURN_SELECT_SEAT_DATA,
  SELECT_PAYMENT_METHOD,
  SELECT_SEAT_DATA,
  TOTAL_PAYMENT_LIST,
} from '../type';

export const SelectSeatActionData = data => async dispatch => {
  dispatch({type: SELECT_SEAT_DATA, payload: data});
};
export const DiscountDataAction = data => dispatch => {
  dispatch({type: DISCOUNT_DATA, payload: data});
};
export const SelectpaymentMethodAction = data => dispatch => {
  dispatch({type: SELECT_PAYMENT_METHOD, payload: data});
};

export const ReturnSelectSeatActionData = data => dispatch => {
  dispatch({type: RETURN_SELECT_SEAT_DATA, payload: data});
};
export const totalPaymentListAction = data => dispatch => {
  dispatch({type: TOTAL_PAYMENT_LIST, payload: data});
};

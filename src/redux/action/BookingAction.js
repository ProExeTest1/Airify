import {BOOKING_TRANSACTION_DATA} from '../type';

export const bookingTransactionData = bookingTransaction => async dispatch => {
  dispatch({type: BOOKING_TRANSACTION_DATA, payload: bookingTransaction});
};

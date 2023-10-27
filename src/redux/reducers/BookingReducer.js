import {BOOKING_TRANSACTION_DATA} from '../type';

const initialState = {
  bookingTransactiondata: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_TRANSACTION_DATA:
      return {...state, bookingTransactiondata: action.payload};
    default:
      return state;
  }
};

import {
  SELECT_SEAT_DATA,
  DISCOUNT_DATA,
  SELECT_PAYMENT_MERHOD,
  RETURN_SELECT_SEAT_DATA,
} from '../type';

const INITIAL_STATE = {
  SelectSeatData: [],
  ReturnSelectSeatData: [],
  DiscountData: {},
  SelectPaymentMethod: {},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_SEAT_DATA:
      return {...state, SelectSeatData: action?.payload};
    case RETURN_SELECT_SEAT_DATA:
      return {...state, ReturnSelectSeatData: action?.payload};
    case DISCOUNT_DATA:
      return {...state, DiscountData: action?.payload};
    case SELECT_PAYMENT_MERHOD:
      return {...state, SelectPaymentMethod: action?.payload};
    default:
      return state;
  }
};

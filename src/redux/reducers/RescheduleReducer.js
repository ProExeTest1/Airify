import {
  RESCHEDULE_CARD_DATA,
  RESCHEDULE_DATE_DATA,
  RESCHEDULE_FILTER_DATA,
  RESCHEDULE_NORMAL_DATE_DATA,
  RESCHEDULE_SELECT_NEW_CARD,
  RESCHEDULE_SELECT_SEAT_DATA,
  RESCHEDULE_TOTAL_PAYMENT_LIST,
  RESCHEDULE_PAYMENT_METHOD_DATA,
} from '../type';

const INITIAL_STATE = {
  rescheduleCardData: {},
  rescheduleSelectNewCard: {},
  rescheduleFilterData: {},
  rescheduleDateData: '',
  rescheduleNormalDateData: {},
  SelectSeatData: [],
  ReschedulePaymentMethodData: {},
  RescheduletotalPaymentList: {},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESCHEDULE_CARD_DATA:
      return {...state, rescheduleCardData: action?.payload};
    case RESCHEDULE_SELECT_NEW_CARD:
      return {...state, rescheduleSelectNewCard: action?.payload};
    case RESCHEDULE_FILTER_DATA:
      return {...state, rescheduleFilterData: action?.payload};
    case RESCHEDULE_DATE_DATA:
      return {...state, rescheduleDateData: action?.payload};
    case RESCHEDULE_NORMAL_DATE_DATA:
      return {...state, rescheduleNormalDateData: action?.payload};
    case RESCHEDULE_SELECT_SEAT_DATA:
      return {...state, SelectSeatData: action?.payload};
    case RESCHEDULE_PAYMENT_METHOD_DATA:
      return {...state, ReschedulePaymentMethodData: action?.payload};
    case RESCHEDULE_TOTAL_PAYMENT_LIST:
      return {...state, RescheduletotalPaymentList: action?.payload};
    default:
      return state;
  }
};

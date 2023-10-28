import {
  RESCHEDULE_CARD_DATA,
  RESCHEDULE_DATE_DATA,
  RESCHEDULE_FILTER_DATA,
  RESCHEDULE_NORMAL_DATE_DATA,
  RESCHEDULE_SELECT_NEW_CARD,
} from '../type';

const INITIAL_STATE = {
  rescheduleCardData: {},
  rescheduleSelectNewCard: {},
  rescheduleFilterData: {},
  rescheduleDateData: '',
  rescheduleNormalDateData: {},
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
    default:
      return state;
  }
};

import {
  RESCHEDULE_CARD_DATA,
  RESCHEDULE_DATE_DATA,
  RESCHEDULE_FILTER_DATA,
  RESCHEDULE_NORMAL_DATE_DATA,
  RESCHEDULE_SELECT_NEW_CARD,
} from '../type';

export const RescheduleCardData = depaturePlace => async dispatch => {
  dispatch({type: RESCHEDULE_CARD_DATA, payload: depaturePlace});
};
export const rescheduleSelectNewCardData = depaturePlace => async dispatch => {
  dispatch({type: RESCHEDULE_SELECT_NEW_CARD, payload: depaturePlace});
};
export const RescheduleFilterData = depaturePlace => async dispatch => {
  dispatch({type: RESCHEDULE_FILTER_DATA, payload: depaturePlace});
};
export const RescheduleDateData = depaturePlace => async dispatch => {
  dispatch({type: RESCHEDULE_DATE_DATA, payload: depaturePlace});
};
export const RescheduleNormalDateData = depaturePlace => async dispatch => {
  dispatch({type: RESCHEDULE_NORMAL_DATE_DATA, payload: depaturePlace});
};

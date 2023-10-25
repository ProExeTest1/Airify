import {TICKET_ID} from '../type';

export const showTicketActionData = data => async dispatch => {
  dispatch({type: TICKET_ID, payload: data});
};

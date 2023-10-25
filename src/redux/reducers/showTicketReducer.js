import {TICKET_ID} from '../type';

const initialState = {
  ticketId: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TICKET_ID:
      return {...state, ticketId: action.payload};
    default:
      return state;
  }
};

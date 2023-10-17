import {SELECT_SEAT_DATA} from '../type';

const INITIAL_STATE = {
  SelectSeatData: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_SEAT_DATA:
      return {...state, SelectSeatData: action?.payload};
    default:
      return state;
  }
};

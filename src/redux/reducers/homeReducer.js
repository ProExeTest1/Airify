import {DINE_WAY, OTP} from '../type';

const initialState = {
  OTP: '',
  DineWayData: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DINE_WAY:
      return {...state, DineWayData: action.payload};
    case OTP:
      return {...state, OTP: action.payload};
    default:
      return state;
  }
};

import {ADDRESS_DATA, OTP} from '../type';

const initialState = {
  addressData: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_DATA:
      return {...state, addressData: action.payload};
    default:
      return state;
  }
};

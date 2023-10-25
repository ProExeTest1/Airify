import {USER_DATA_FROM_FIREBASE} from '../type';

const initialState = {
  userdata: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_FROM_FIREBASE:
      return {...state, userdata: action.payload};
    default:
      return state;
  }
};

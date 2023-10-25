import {
  RETURN_DATE,
  NORMAL_DATE,
  DEPATURE_DATE,
  RETURN_NORMAL_DATE,
} from '../type';

const INITIAL_STATE = {
  returnDate: '',
  normalDate: {},
  depatureDate: '',
  returnNormalDate: {},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DEPATURE_DATE:
      return {...state, depatureDate: action?.payload};
    case NORMAL_DATE:
      return {...state, normalDate: action?.payload};
    case RETURN_DATE:
      return {...state, returnDate: action?.payload};
    case RETURN_NORMAL_DATE:
      return {...state, returnNormalDate: action?.payload};
    default:
      return state;
  }
};

import {DINE_WAY} from '../type';

const initialState = {
  DineWayData: [],
  status: '',
};
const onBoardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case DINE_WAY:
      return {...state, DineWayData: action.payload};
    case 'STATUS':
      return {...state, status: action.payload};
    default:
      return state;
  }
};

export default onBoardingReducer;

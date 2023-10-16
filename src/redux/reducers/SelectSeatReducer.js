import {SEILCT_SEAT_DATA} from '../type';

const INITIAL_STATE = {
  SelectSeatData: [
    {name: 'kenil panchani', seatNo: false},
    {name: 'jenf pahani', seatNo: false},
    {name: 'efv effeg', seatNo: false},
  ],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEILCT_SEAT_DATA:
      return {...state, depaturePlace: action?.payload};
    default:
      return state;
  }
};

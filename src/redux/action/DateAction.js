import {
  DEPATURE_DATE,
  NORMAL_DATE,
  RETURN_DATE,
  RETURN_NORMAL_DATE,
} from '../type';

export const depatureDateAction = departureDate => async dispatch => {
  dispatch({type: DEPATURE_DATE, payload: departureDate});
};
export const returnDateAction = returnDate => async dispatch => {
  dispatch({type: RETURN_DATE, payload: returnDate});
};
export const dateAction = dateAction => async dispatch => {
  dispatch({type: NORMAL_DATE, payload: dateAction});
};
export const returnNormalDateAction = NormalDateAction => async dispatch => {
  dispatch({type: RETURN_NORMAL_DATE, payload: NormalDateAction});
};

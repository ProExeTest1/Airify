import {COLORTHEMETYPE} from '../type';

export const colorThemeType = departureDate => async dispatch => {
  dispatch({type: COLORTHEMETYPE, payload: departureDate});
};

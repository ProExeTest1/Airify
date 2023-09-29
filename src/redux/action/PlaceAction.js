import {DEPATURE_PLACE, DESTINATION_PALCE} from '../type';

export const depaturePlaceAction = depaturePlace => async dispatch => {
  dispatch({type: DEPATURE_PLACE, payload: depaturePlace});
};
export const destinationPlaceAction = destinationPlace => async dispatch => {
  dispatch({type: DESTINATION_PALCE, payload: destinationPlace});
};

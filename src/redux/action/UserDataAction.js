import {USER_DATA_FROM_FIREBASE} from '../type';

export const UserDataAction = userData => async dispatch => {
  dispatch({type: USER_DATA_FROM_FIREBASE, payload: userData});
};

import {CHANGE_LANGUAGE} from '../type';

export const languageChangeAction = language => async dispatch => {
  dispatch({type: CHANGE_LANGUAGE, payload: language});
};

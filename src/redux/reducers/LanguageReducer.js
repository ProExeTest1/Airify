import {frenchStrings, strings} from '../../helper/Strings';
import {CHANGE_LANGUAGE} from '../type';

const INITIAL_STATE = {
  choosenLanguage: 'English',
  languageObject: strings,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        choosenLanguage: action.payload,
        languageObject: action?.payload === 'French' ? frenchStrings : strings,
      };
    default:
      return state;
  }
};

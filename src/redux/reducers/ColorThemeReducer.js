import {darkModeColors, lightModeColors} from '../../helper/ColorConstant';
import {COLORTHEMETYPE} from '../type';

const initialState = {
  isDarkTheme: false,
  colorTheme: lightModeColors,
};
export default (state = initialState, action) => {
  console.log('action?.payload', action?.payload);
  switch (action.type) {
    case COLORTHEMETYPE:
      return {
        ...state,
        isDarkTheme: action.payload,
        colorTheme: action?.payload ? darkModeColors : lightModeColors,
      };
    default:
      return state;
  }
};

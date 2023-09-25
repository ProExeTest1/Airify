import {combineReducers} from 'redux';
import signupReducer from '../reducer/HomeReducer';

const rootReducer = combineReducers({
  signup: signupReducer,
});

export default rootReducer;

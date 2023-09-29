import {combineReducers} from 'redux';
import onBoardingReducer from './HomeReducer';

const rootReducer = combineReducers({
  OnBoarding: onBoardingReducer,
});

export default rootReducer;

import axios from 'axios';
import {DINE_WAY, OTP} from '../type';
import {makeAPIRequest} from '../../helper/global';

export const otp = otp => dispatch => {
  dispatch({type: OTP, payload: otp});
};
export const DineWay = () => async dispatch => {
  await makeAPIRequest({
    method: 'GET',
  }).then(response => {
    dispatch({type: DINE_WAY, payload: response?.data});
  });
};

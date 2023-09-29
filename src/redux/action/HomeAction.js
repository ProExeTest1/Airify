// import {makeAPIRequest} from '../../helper/global';
import axios from 'axios';
import {DINE_WAY} from '../type';
import {makeAPIRequest} from '../../helper/global';

export const active = status => dispatch => {
  dispatch({type: 'STATUS', payload: status});
};
export const DineWay = () => async dispatch => {
  await makeAPIRequest({
    method: 'GET',
  }).then(response => {
    dispatch({type: DINE_WAY, payload: response?.data});
  });
};

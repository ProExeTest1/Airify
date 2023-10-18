import {Share} from 'react-native';
import {AlertConstant} from './AlertConstant';

export const ShareConstant = async data => {
  try {
    await Share.share({
      title: 'Flight Ticket',
      message: data,
      url: 'https://proexelancers.com/',
    });
  } catch (error) {
    AlertConstant(error.message);
  }
};

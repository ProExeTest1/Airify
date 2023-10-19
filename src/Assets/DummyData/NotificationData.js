import {Images} from '../../helper/IconConstant';

export const NotificationData = [
  {
    data: [
      {
        id: 1,
        title: 'New Feature Alert!',
        discription:
          'Discover exciting new app features. Enhance your travel experience  today!',
        image: Images.checkBox_tickMark,
      },
    ],
    time: 'Today',
  },
  {
    time: 'Yesterday',
    data: [
      {
        id: 2,
        title: 'Enable 2-Factor Authentication',
        discription:
          'Use 2-factor authentication for multiple layers security on your account.',
        image: Images.security,
      },
      {
        id: 3,
        title: 'Your Flight Update!',
        discription: 'Flight to Tokyo (HND) on time at gate B12. Safe travels!',
        image: Images.aeroplane,
        ticket: 'update',
      },
    ],
  },
  {
    time: 'Dec 20, 2023',
    data: [
      {
        id: 4,
        title: 'Eclusive Offer Unlocked!',
        discription:
          'Congrats! You have unlocked a 15% discount on your next flight booking with Airify. Start planning your adventure today!',
        image: Images.discount,
      },
      {
        id: 5,
        title: 'Multiple Payment Updates!',
        discription:
          'Now you can add a credit card for flight tickets payments.',
        image: Images.payments,
        time: 'Dec 20, 2023',
      },
    ],
  },
];

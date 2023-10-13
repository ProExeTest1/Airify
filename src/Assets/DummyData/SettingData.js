import {Images} from '../../helper/IconConstant';

export const SettingData = [
  {
    header: '',
    data: [
      {
        id: 1,
        title: 'Passenger List',
        icon: Images.passenger,
        screen: 'PassengerList',
      },
      {
        id: 2,
        title: 'Discounts / Vouchers',
        icon: Images.discount,
        // screen: 'SignUpScreen',
      },
      {
        id: 3,
        title: 'Airify Points',
        icon: Images.points,
        // screen: 'SignUpScreen',
      },
      {
        id: 4,
        title: 'Airify Rewards',
        icon: Images.rewards,
        // screen: 'SignUpScreen',
      },
      {
        id: 5,
        title: 'Saved Address',
        icon: Images.address,
        screen: 'SavedAddress',
      },
      {
        id: 6,
        title: 'Linked Accounts',
        icon: Images.accountLink,
        // screen: 'SignUpScreen',
      },
    ],
  },
  {
    header: 'General',
    data: [
      {
        id: 1,
        title: 'Personal Info',
        icon: Images.account,
        screen: 'PersonalInfo',
      },
      {
        id: 2,
        title: 'Notification',
        icon: Images.bell,
        screen: 'Notification',
      },
      {
        id: 3,
        title: 'Security',
        icon: Images.security,
        screen: 'Security',
      },
      {
        id: 4,
        title: 'Language',
        icon: Images.language,
        screen: 'Language',
      },
      {
        id: 5,
        title: 'Dark Mode',
        icon: Images.ViewPassword,
      },
    ],
  },
  {
    header: 'About',
    data: [
      {
        id: 1,
        title: 'Help Center',
        icon: Images.helpCenter,
        screen: 'HelpCenter',
      },
      {
        id: 2,
        title: 'About Airify',
        icon: Images.info,
        screen: 'AboutAirify',
      },
      {
        id: 3,
        title: 'Logout',
        icon: Images.logout,
      },
    ],
  },
];

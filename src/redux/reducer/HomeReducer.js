const initialState = {
  profileData: {},
  followers: {},
  all: {},
  statusData: false,
};
const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SIGNUP_DATA':
      return {...state, profileData: action.payload};
    case 'FOLLOWERS_DATA':
      return {...state, followers: action.payload};
    case 'ALL_DATA':
      return {...state, all: action.payload};
    case 'STATUS':
      return {...state, statusData: action.payload};
    case 'LOGOUT':
      return {
        ...state,
        signupData: {username: '', password: '', email: ''},
      };
    default:
      return state;
  }
};

export default signupReducer;

export const cartAPI = data => dispatch => {
  dispatch({type: 'UPDATE_SIGNUP_DATA', payload: data});
};

export const followersData = Followers => dispatch => {
  dispatch({type: 'FOLLOWERS_DATA', payload: Followers});
};

export const allData = all => dispatch => {
  dispatch({type: 'ALL_DATA', payload: all});
};

export const active = status => dispatch => {
  dispatch({type: 'STATUS', payload: status});
};

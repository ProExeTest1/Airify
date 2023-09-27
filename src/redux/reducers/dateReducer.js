const INITIAL_STATE = {
    depatureDate : '',
    normalDate : ''
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "DEPATURE_DATE":
        return { ...state,depatureDate: action?.payload};
      case "NORMAL_DATE":
        return { ...state,normalDate: action?.payload};
      default:
        return state;
    }
  };
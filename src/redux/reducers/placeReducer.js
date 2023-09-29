import { DEPATURE_PLACE, DESTINATION_PALCE } from "../type";

const INITIAL_STATE = {
    depaturePlace : {},
    destinationPlace : {}
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case DEPATURE_PLACE:
        return { ...state,depaturePlace: action?.payload};
      case DESTINATION_PALCE:
        return { ...state,destinationPlace: action?.payload};
      default:
        return state;
    }
  };
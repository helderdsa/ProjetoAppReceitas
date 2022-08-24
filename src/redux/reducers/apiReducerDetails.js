const INITIAL_STATE = {
  details: [],
  isLoading: false,
};

const apiReducerDetails = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'DETAILS_API_REQUEST':
    return {
      ...state,
      details: payload,
      isLoading: false,
    };
  case 'IS_LOADING':
    return {
      ...state,
      isLoading: true,
    };
  default:
    return state;
  }
};

export default apiReducerDetails;

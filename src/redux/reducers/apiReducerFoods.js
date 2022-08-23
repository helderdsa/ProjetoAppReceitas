const INITIAL_STATE = {
  meals: [],
  isLoading: false,
};

const apiReducerFoods = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'FOODS_API_REQUEST':
    return {
      ...state,
      meals: payload.meals,
      isLoading: false,
    };
  case 'IS_LOADING':
    return {
      ...state,
      isLoading: true,
    };
  case 'FAIL_API_REQUEST':
    return {
      ...state,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default apiReducerFoods;

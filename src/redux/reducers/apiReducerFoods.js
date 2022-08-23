const INITIAL_STATE = {
  meals: [],
};

const apiReducerFoods = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'FOODS_API_REQUEST':
    return {
      ...state,
      payload,
    };
  default:
    return state;
  }
};

export default apiReducerFoods;

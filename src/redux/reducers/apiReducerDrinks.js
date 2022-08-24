const INITIAL_STATE = {
  drinks: [],
  drinksCategories: { drinks: [] },
  isLoading: false,
};

const apiReducerDrinks = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'DRINKS_API_REQUEST':
    return {
      ...state,
      drinks: payload.drinks,
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
  case 'DRINKS_CATEGORIES_API_REQUEST':
    return {
      ...state,
      drinksCategories: payload,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default apiReducerDrinks;

const isLoading = (payload) => ({
  type: 'IS_LOADING',
  payload,
});

// const apiRequest = (payload) => ({
//   type: 'API_REQUEST',
//   payload,
// });

const failApiRequest = (payload) => ({
  type: 'FAIL_API_REQUEST',
  payload,
});

const foodsRequest = (payload) => ({
  type: 'FOODS_API_REQUEST',
  payload,
});

const foodsCategoriesRequest = (payload) => ({
  type: 'FOODS_CATEGORIES_API_REQUEST',
  payload,
});

const drinkRequest = (payload) => ({
  type: 'DRINKS_API_REQUEST',
  payload,
});

const drinksCategoriesRequest = (payload) => ({
  type: 'DRINKS_CATEGORIES_API_REQUEST',
  payload,
});

// const detailsRequest = (payload) => ({
//   type: 'DETAILS_API_REQUEST',
//   payload,
// });

export const fetchMeals = (url) => (
  async (dispatch) => {
    dispatch(isLoading());
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(foodsRequest(data));
    } catch (error) {
      dispatch(failApiRequest());
    }
  }
);

export const fetchDrinks = (url) => (
  async (dispatch) => {
    dispatch(isLoading());
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(drinkRequest(data));
    } catch (error) {
      dispatch(failApiRequest());
    }
  }
);

export const fetchCategoriesMeals = (url) => (
  async (dispatch) => {
    dispatch(isLoading());
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(foodsCategoriesRequest(data));
    } catch (error) {
      dispatch(failApiRequest());
    }
  }
);

export const fetchCategoriesDrinks = (url) => (
  async (dispatch) => {
    dispatch(isLoading());
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(drinksCategoriesRequest(data));
    } catch (error) {
      dispatch(failApiRequest());
    }
  }
);

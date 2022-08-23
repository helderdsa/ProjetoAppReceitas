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

const drinkRequest = (payload) => ({
  type: 'DRINKS_API_REQUEST',
  payload,
});

const detailsRequest = (payload) => ({
  type: 'DETAILS_API_REQUEST',
  payload,
});

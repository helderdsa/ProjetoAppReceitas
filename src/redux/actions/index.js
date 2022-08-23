const isLoading = (value) => ({
  type: 'IS_LOADING',
  value,
});

const failApiRequest = (value) => ({
  type: 'FAIL_API_REQUEST',
  value,
});

const foodsResponse = (value) => ({
  type: 'FOODS_API_RESPONSE',
  value,
});

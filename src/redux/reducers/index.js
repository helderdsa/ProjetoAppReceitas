import { combineReducers } from 'redux';
import apiReducerFoods from './apiReducerFoods';
import apiReducerDrinks from './apiReducerDrinks';
import apiReducerDetails from './apiReducerDetails';

const rootReducer = combineReducers({
  mealsReducer: apiReducerFoods,
  drinksReducer: apiReducerDrinks,
  detailsReducer: apiReducerDetails,
});

export default rootReducer;

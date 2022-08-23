import { combineReducers } from 'redux';
import apiReducerFoods from './apiReducerFoods';
import apiReducerDrinks from './apiReducerDrinks';

const rootReducer = combineReducers({
  mealsReducer: apiReducerFoods,
  drinksReducer: apiReducerDrinks,
});

export default rootReducer;

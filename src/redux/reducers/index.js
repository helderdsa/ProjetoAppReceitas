import { combineReducers } from 'redux';
import apiReducerFoods from './apiReducerFoods';
import apiReducerDrinks from './apiReducerDrinks';

const rootReducer = combineReducers({
  meals: apiReducerFoods,
  drinks: apiReducerDrinks,
});

export default rootReducer;

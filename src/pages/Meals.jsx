import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeals } from '../redux/actions';

function Meals() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }, []);

  const data = useSelector((state) => state.mealsReducer.meals);

  return (
    <div>
      meals
      {data.length > 0 && console.log('meals', data)}
    </div>
  );
}

export default Meals;

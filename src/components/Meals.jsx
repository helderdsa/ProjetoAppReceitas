import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from './RecipeCard';
import { fetchMeals } from '../redux/actions';

function Meals() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }, []);

  const data = useSelector((state) => state.mealsReducer.meals);
  const arrayLength = 12;

  return (
    <div>
      {(data !== null && data.length > 0) && data.slice(0, arrayLength)
        .map((recipe, index) => (<RecipeCard
          recipeThumb={ recipe.strMealThumb }
          recipeName={ recipe.strMeal }
          index={ index }
          key={ index }
        />))}
    </div>
  );
}

export default Meals;

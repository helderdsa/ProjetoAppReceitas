import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from './RecipeCard';
import { fetchMeals, fetchCategoriesMeals } from '../redux/actions';
import FilterButtons from './FilterButtons';

function Meals() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    dispatch(fetchCategoriesMeals('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));
  }, []);

  const data = useSelector((state) => state.mealsReducer.meals);
  const categories = useSelector((state) => state.mealsReducer.mealsCategories);
  const arrayLength = 12;

  return (
    <div>
      {categories.meals.length > 0
      && <FilterButtons categories={ categories.meals } isFood />}
      {(data !== null && data.length > 0) && data.slice(0, arrayLength)
        .map((recipe, index) => (<RecipeCard
          recipeThumb={ recipe.strMealThumb }
          recipeName={ recipe.strMeal }
          index={ index }
          key={ index }
          url={ `/foods/${recipe.idMeal}` }
        />))}
    </div>
  );
}

export default Meals;

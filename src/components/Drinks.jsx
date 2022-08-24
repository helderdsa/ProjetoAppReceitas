import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from './RecipeCard';
import { fetchDrinks, fetchCategoriesDrinks } from '../redux/actions';
import FilterButtons from './FilterButtons';

function Drinks() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    dispatch(fetchCategoriesDrinks('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));
  }, []);

  const data = useSelector((state) => state.drinksReducer.drinks);
  const categories = useSelector((state) => state.drinksReducer.drinksCategories);
  const arrayLength = 12;

  return (
    <div>
      {categories.drinks.length > 0
      && <FilterButtons categories={ categories.drinks } isFood={ false } />}
      {(data !== null && data.length > 0) && data.slice(0, arrayLength)
        .map((recipe, index) => (<RecipeCard
          recipeThumb={ recipe.strDrinkThumb }
          recipeName={ recipe.strDrink }
          index={ index }
          key={ index }
        />))}
    </div>
  );
}

export default Drinks;

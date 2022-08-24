import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from './RecipeCard';
import { fetchDrinks } from '../redux/actions';

function Drinks() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
  }, []);

  const data = useSelector((state) => state.drinksReducer.drinks);
  const arrayLength = 12;

  return (
    <div>
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

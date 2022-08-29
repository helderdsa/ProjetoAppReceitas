import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import { fetchMeals, fetchCategoriesMeals,
  fetchDrinks, fetchCategoriesDrinks } from '../redux/actions';
import RecipeCard from '../components/RecipeCard';

function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    dispatch(fetchCategoriesMeals('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));
    dispatch(fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    dispatch(fetchCategoriesDrinks('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));
  }, []);

  const arrayLength = 12;

  const dataMeals = useSelector((state) => state.mealsReducer.meals);
  const categoriesMeals = useSelector((state) => state.mealsReducer.mealsCategories);

  const dataDrinks = useSelector((state) => state.drinksReducer.drinks);
  const categoriesDrinks = useSelector((state) => state.drinksReducer.drinksCategories);

  if (pathname.includes('foods')) {
    return (
      <>
        <Header />
        <div>
          {categoriesMeals.meals.length > 0
      && <FilterButtons categories={ categoriesMeals.meals } isFood />}
          {(dataMeals !== null && dataMeals.length > 0) && dataMeals
            .slice(0, arrayLength)
            .map((recipe, index) => (<RecipeCard
              recipeThumb={ recipe.strMealThumb }
              recipeName={ recipe.strMeal }
              index={ index }
              key={ index }
              url={ `/foods/${recipe.idMeal}` }
            />))}
        </div>
        <Footer />
      </>
    );
  }
  if (pathname.includes('drinks')) {
    return (
      <>
        <Header />
        <div>
          {categoriesDrinks.drinks.length > 0
      && <FilterButtons categories={ categoriesDrinks.drinks } isFood={ false } />}
          {(dataDrinks !== null && dataDrinks.length > 0) && dataDrinks
            .slice(0, arrayLength)
            .map((recipe, index) => (<RecipeCard
              recipeThumb={ recipe.strDrinkThumb }
              recipeName={ recipe.strDrink }
              index={ index }
              key={ index }
              url={ `/drinks/${recipe.idDrink}` }
            />))}
        </div>
        <Footer />
      </>
    );
  }
}

export default Recipes;

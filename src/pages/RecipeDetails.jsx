import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MealsDetails from '../components/MealsDetails';
import DrinksDetails from '../components/DrinksDetails';
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const isDone = doneRecipes && doneRecipes.some((recipe) => recipe.id === id);
  const inProgressPathname = (pathname.includes('foods'))
    ? inProgressRecipes && inProgressRecipes.meals
    : inProgressRecipes && inProgressRecipes.cocktails;
  const inProgressKeys = inProgressPathname && Object.keys(inProgressPathname);
  const inProgress = inProgressKeys && inProgressKeys.some((recipe) => recipe === id);

  const redirectToInProgress = () => {
    if (pathname.includes('foods')) {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <>
      {pathname.includes('foods') && <MealsDetails id={ id } />}
      {pathname.includes('drinks') && <DrinksDetails id={ id } />}

      {
        !isDone
        && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="recipe-btn"
            onClick={ redirectToInProgress }
          >
            {inProgress ? 'Continue Recipe' : 'Start Button'}
          </button>)
      }
    </>
  );
}

export default RecipeDetails;

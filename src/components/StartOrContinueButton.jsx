import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../pages/RecipeDetails.css';

function StartOrContinueButton() {
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

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      if (pathname.includes('foods')) {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ cocktails: {}, meals: { [id]: [] } }));
      } else {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ cocktails: { [id]: [] }, meals: {} }));
      }
    }
  }, []);

  const startOrContinueFood = () => {
    const inProgressLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgress) {
      const { cocktails, meals } = inProgressLocalStorage;
      meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
    }
  };

  const startOrContinueDrinks = () => {
    const inProgressLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgress) {
      const { cocktails, meals } = inProgressLocalStorage;
      cocktails[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
    }
  };

  const redirectToInProgress = () => {
    if (pathname.includes('foods')) {
      startOrContinueFood();
      history.push(`/foods/${id}/in-progress`);
    } else {
      startOrContinueDrinks();
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div>
      {
        !isDone
        && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="recipe-btn"
            onClick={ redirectToInProgress }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>)
      }
    </div>
  );
}

export default StartOrContinueButton;

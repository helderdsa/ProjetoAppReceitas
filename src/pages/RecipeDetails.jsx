import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MealsDetails from '../components/MealsDetails';
import DrinksDetails from '../components/DrinksDetails';
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <>
      {pathname.includes('foods') && <MealsDetails id={ id } />}
      {pathname.includes('drinks') && <DrinksDetails id={ id } />}
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="recipe-btn"
      >
        Start Button
      </button>
    </>
  );
}

export default RecipeDetails;

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MealsDetails from '../components/MealsDetails';
import DrinksDetails from '../components/DrinksDetails';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <>
      {pathname.includes('foods') && <MealsDetails id={ id } />}
      {pathname.includes('drinks') && <DrinksDetails id={ id } />}
    </>
  );
}

export default RecipeDetails;

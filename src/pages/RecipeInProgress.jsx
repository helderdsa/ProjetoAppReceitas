import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DrinksProgress from '../components/DrinksProgress';
import MealsProgress from '../components/MealsProgress';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <>
      {pathname.includes('foods') && <MealsProgress id={ id } />}
      {pathname.includes('drinks') && <DrinksProgress id={ id } />}
    </>
  );
}

export default RecipeInProgress;

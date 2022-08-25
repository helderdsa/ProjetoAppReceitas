import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { fetchMeals } from '../services/fetch';

function CarouselMeals() {
  const [carousel, setCarousel] = useState();
  const setState = async () => {
    const response = await fetchMeals();
    setCarousel(response);
  };

  useEffect(() => {
    setState();
  }, []);

  return (
    <div>
      {carousel && carousel.map(({ strMeal, strMealThumb, idMeal }, i) => (
        <RecipeCard
          key={ i }
          recipeThumb={ strMealThumb }
          recipeName={ strMeal }
          index={ i }
          url={ `/foods/${idMeal}` }
        />
      ))}
    </div>
  );
}

export default CarouselMeals;

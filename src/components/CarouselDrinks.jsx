import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { fetchDrinks } from '../services/fetch';

function CarouselDrinks() {
  const [carousel, setCarousel] = useState();
  const setState = async () => {
    const response = await fetchDrinks();
    setCarousel(response);
  };

  useEffect(() => {
    setState();
  }, []);

  return (
    <div>
      {carousel && carousel.map(({ strDrink, strDrinkThumb, idDrink }, i) => (
        <RecipeCard
          key={ i }
          recipeThumb={ strDrinkThumb }
          recipeName={ strDrink }
          index={ i }
          url={ `/drinks/${idDrink}` }
        />
      ))}
    </div>
  );
}

export default CarouselDrinks;

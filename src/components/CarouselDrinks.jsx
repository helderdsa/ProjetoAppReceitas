import React, { useState, useEffect } from 'react';
import CarouselCard from './CarouselCard';
import { fetchDrinks } from '../services/fetch';
import './Carousel.css';

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
    <div className="carousel">
      {carousel && carousel
        .map(({ strDrink, strDrinkThumb, idDrink, strAlcoholic }, i) => (
          <CarouselCard
            key={ i }
            recipeThumb={ strDrinkThumb }
            recipeName={ strDrink }
            index={ i }
            category={ strAlcoholic }
            url={ `/drinks/${idDrink}` }
          />
        ))}
    </div>
  );
}

export default CarouselDrinks;

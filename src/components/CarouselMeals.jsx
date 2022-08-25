import React, { useState, useEffect } from 'react';
import { fetchMeals } from '../services/fetch';
import CarouselCard from './CarouselCard';
import './Carousel.css';

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
    <div className="carousel">
      {carousel && carousel.map(({ strMeal, strMealThumb, idMeal, strCategory }, i) => (
        <CarouselCard
          key={ i }
          recipeThumb={ strMealThumb }
          recipeName={ strMeal }
          category={ strCategory }
          index={ i }
          url={ `/foods/${idMeal}` }
        />
      ))}
    </div>
  );
}

export default CarouselMeals;

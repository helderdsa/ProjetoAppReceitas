import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CarouselCard from './CarouselCard';
import { fetchDrinks, fetchMeals } from '../services/fetch';
import './Carousel.css';

function Carousel() {
  const [carousel, setCarousel] = useState();

  const history = useHistory();
  const { location: { pathname } } = history;

  const setState = async () => {
    if (pathname.includes('foods')) {
      const response = await fetchDrinks();
      setCarousel(response);
    } else {
      const response = await fetchMeals();
      setCarousel(response);
    }
  };

  useEffect(() => {
    setState();
  }, []);

  useEffect(() => {
    setState();
  }, [pathname]);

  if (pathname.includes('foods')) {
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
  if (pathname.includes('drinks')) {
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
}

export default Carousel;

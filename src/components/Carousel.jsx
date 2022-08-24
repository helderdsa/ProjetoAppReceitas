import React, { useState, useEffect } from 'react';
import { fetchDrinks, fetchMeals } from '../services/fetch';

function Carousel({ isFood }) {
  const [Carousel, setCarousel] = useState();
  const setState = async () => {
    if (isFood) {
      const response = await fetchDrinks();
      setCarousel(response);
    }
    if (!isFood) {
      const response = await fetchMeals();
      setCarousel(response);
    }
  };
  useEffect(() => {
    setState();
  }, []);
  return (
    <div>
      {Carousel && Carousel.map((picture, index) => (
        <img
          style={ { height: '100px' } }
          alt="test"
          src="https://reactjs.org/logo-og.png"
        />
      )) }
    </div>
  );
}

export default Carousel;

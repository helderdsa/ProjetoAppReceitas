import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => { history.push('/drinks'); } }
      >
        <img src={ drinkIcon } alt="drink" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => { history.push('/foods'); } }
      >
        <img src={ mealIcon } alt="foods" />
      </button>
    </footer>
  );
}

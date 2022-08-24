import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrinks } from '../redux/actions';

function Drinks() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
  }, []);

  const data = useSelector((state) => state.drinksReducer.drinks);

  return (
    <div>
      drinks
      {data.length > 0 && console.log('Drinks', data)}
    </div>
  );
}

export default Drinks;

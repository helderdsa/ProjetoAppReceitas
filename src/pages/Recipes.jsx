import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Meals from './Meals';
import Drinks from './Drinks';

function Recipes() {
  const history = useHistory();

  return (
    <>
      <Header />
      Recipes page
      {history.location.pathname === '/foods' && <Meals />}
      {history.location.pathname === '/drinks' && <Drinks />}
      <Footer />
    </>
  );
}

export default Recipes;

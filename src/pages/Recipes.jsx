import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const history = useHistory();

  return (
    <>
      <Header />
      {history.location.pathname === '/foods' && <Meals />}
      {history.location.pathname === '/drinks' && <Drinks />}
      <Footer />
    </>
  );
}

export default Recipes;

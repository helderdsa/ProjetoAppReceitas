import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
// import Footer from '../components/Footer';

function Profile() {
  const [email, setEmail] = useState();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      history.push('/');
    } else {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      setEmail(userInfo.email);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <>
      <Header />
      <h3 data-testid="profile-email">{email}</h3>

      <button
        type="button"
        onClick={ () => history.push('/done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>

      <button
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        onClick={ logoutUser }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>

      {/* <Footer /> */}
    </>
  );
}

export default Profile;

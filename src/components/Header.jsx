import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const verifyPathname = () => {
    switch (pathname) {
    case '/foods':
      return 'Foods';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      break;
    }
  };

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>

      <h1 data-testid="page-title">
        {
          verifyPathname()
        }
      </h1>

      {
        (pathname === '/drinks' || pathname === '/foods')
          ? (
            <img
              src={ searchIcon }
              alt="profile icon"
              data-testid="search-top-btn"
            />
          )
          : (
            <div />
          )
      }
    </header>
  );
}

export default Header;

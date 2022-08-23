import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const [searchBar, setSearchBar] = useState(false);

  const verifyPathname = () => {
    switch (pathname) {
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return 'Foods';
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
            <button
              type="button"
              onClick={ () => setSearchBar(!searchBar) }
            >
              <img
                src={ searchIcon }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>

          )
          : (
            <div />
          )
      }
      { searchBar
        ? <SearchBar />
        : null}

    </header>
  );
}

export default Header;

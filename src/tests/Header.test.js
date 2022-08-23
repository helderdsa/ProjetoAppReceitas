import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/RenderWithRouter';
import App from '../App';

const headerTitleTestId = 'page-title';
const profileIconTestId = 'profile-top-btn';
const searchIconTestId = 'search-top-btn';
const profileIconSrc = 'profileIcon.svg';
const searchIconSrc = 'searchIcon.svg';

describe('Foods and Drinks Header component tests', () => {
  it('foods page header test', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const headerTitle = screen.getByTestId(headerTitleTestId);
    const profileIcon = screen.getByTestId(profileIconTestId);
    const searchIcon = screen.getByTestId(searchIconTestId);

    expect(headerTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    expect(profileIcon).toHaveAttribute('src', profileIconSrc);
    expect(searchIcon).toHaveAttribute('src', searchIconSrc);

    expect(headerTitle.innerHTML).toBe('Foods');
  });

  it('drinks page header test', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const headerTitle = screen.getByTestId(headerTitleTestId);
    const profileIcon = screen.getByTestId(profileIconTestId);
    const searchIcon = screen.getByTestId(searchIconTestId);

    expect(headerTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    expect(profileIcon).toHaveAttribute('src', profileIconSrc);
    expect(searchIcon).toHaveAttribute('src', searchIconSrc);

    expect(headerTitle.innerHTML).toBe('Drinks');
  });
});

describe('Profile Header Tests', () => {
  it('profile page header test', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
    const profileIcon = screen.getByTestId(profileIconTestId);

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
    const headerTitle = screen.getByTestId(headerTitleTestId);
    expect(headerTitle).toBeInTheDocument();
    expect(screen.getByTestId(profileIconTestId)).toBeInTheDocument();
    expect(headerTitle.innerHTML).toBe('Profile');
    expect(screen.queryByTestId(searchIconTestId)).not.toBeInTheDocument();
  });
});

describe('Done recipes Header Tests', () => {
  it('Done recipes page header test', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const headerTitle = screen.getByTestId(headerTitleTestId);
    expect(headerTitle).toBeInTheDocument();
    expect(screen.getByTestId(profileIconTestId)).toBeInTheDocument();
    expect(headerTitle.innerHTML).toBe('Done Recipes');
    expect(screen.queryByTestId(searchIconTestId)).not.toBeInTheDocument();
  });
});

describe('Favorite Recipes Header Tests', () => {
  it('Favorite Recipes page header test', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const headerTitle = screen.getByTestId(headerTitleTestId);
    expect(headerTitle).toBeInTheDocument();
    expect(screen.getByTestId(profileIconTestId)).toBeInTheDocument();
    expect(headerTitle.innerHTML).toBe('Favorite Recipes');
    expect(screen.queryByTestId(searchIconTestId)).not.toBeInTheDocument();
  });
});

describe('Search button mechanism test', () => {
  it('', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchIcon = screen.getByTestId(searchIconTestId);
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });
});

describe('Random Header Tests', () => {
  it('Random page header test', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/random');
  });
});

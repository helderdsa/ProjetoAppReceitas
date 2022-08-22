// import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/RenderWithRouter';
import App from '../App';

const headerTitleTestId = 'page-title';
const profileIconTestId = 'profile-top-btn';
const searchIconTestId = 'search-top-btn';
const profileIconSrc = 'src/images/profileIcon.svg';
const searchIconSrc = 'src/images/searchIcon.svg';

describe('Foods and Drinks Header component tests', () => {
  test('foods page header test', () => {
    const { history } = renderWithRouter(App);
    history.push('/foods');

    const headerTitle = screen.getByTestId(headerTitleTestId);
    const profileIcon = screen.getByTestId(profileIconTestId);
    const searchIcon = screen.getByTestId(searchIconTestId);

    expect(headerTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    expect(profileIcon).toHaveAttribute('src', profileIconSrc);
    expect(searchIcon).toHaveAttribute('src', searchIconSrc);

    expect(headerTitle.innerHTML).toBe(/Foods/i);
  });

  test('drinks page header test', () => {
    const { history } = renderWithRouter(App);
    history.push('/drinks');

    const headerTitle = screen.getByTestId(headerTitleTestId);
    const profileIcon = screen.getByTestId(profileIconTestId);
    const searchIcon = screen.getByTestId(searchIconTestId);

    expect(headerTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    expect(profileIcon).toHaveAttribute('src', profileIconSrc);
    expect(searchIcon).toHaveAttribute('src', searchIconSrc);

    expect(headerTitle.innerHTML).toBe(/Drinks/i);
  });
});

describe('Profile Header Tests', () => {
  test('profile page header test', () => {
    const { history } = renderWithRouter(App);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');

    const headerTitle = screen.getByTestId(headerTitleTestId);
    const profileIcon = screen.getByTestId(profileIconTestId);

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
    expect(headerTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(headerTitle.innerHTML).toBe(/Profile/i);
    expect(screen.getByTestId(searchIconTestId)).not.toBeInTheDocument();
  });
});

describe('Search button mechanism test', () => {
  const { history } = renderWithRouter(App);
  history.push('/foods');

  const searchIcon = screen.getByTestId(searchIconTestId);
  userEvent.click(searchIcon);
  const searchBar = screen.getByTestId('search-input');
  expect(searchBar).toBeInTheDocument();
  userEvent.click(searchIcon);
  expect(screen.getByTestId('search-input')).not.toBeInTheDocument();
});

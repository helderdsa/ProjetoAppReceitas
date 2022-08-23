import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/RenderWithRouter';
import App from '../App';

const emailTestId = 'profile-email';
const doneBtnTestId = 'profile-done-btn';
const favBtnTestId = 'profile-favorite-btn';
const logoutBtnTestId = 'profile-logout-btn';

beforeAll(() => {
  localStorage.setItem('user', JSON.stringify({ email: 'braddock@trybe.com' }));
});

describe('Profile page test', () => {
  it('render elements on page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const email = screen.getByTestId(emailTestId);
    const doneBtn = screen.getByTestId(doneBtnTestId);
    const favBtn = screen.getByTestId(favBtnTestId);
    const logoutBtn = screen.getByTestId(logoutBtnTestId);

    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  it('expects done button to redirect to done recipes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const doneBtn = screen.getByTestId(doneBtnTestId);

    userEvent.click(doneBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('expects favorite button to redirect to favorite recipes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const favBtn = screen.getByTestId(favBtnTestId);

    userEvent.click(favBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('expects logout button to redirect to login page and clear storage', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const logoutBtn = screen.getByTestId(logoutBtnTestId);

    userEvent.click(logoutBtn);

    const userInfo = JSON.parse(localStorage.getItem('user'));

    expect(history.location.pathname).toBe('/');
    expect(userInfo).toBe(null);
  });
});

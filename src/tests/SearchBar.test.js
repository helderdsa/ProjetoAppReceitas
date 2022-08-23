import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/RenderWithRouter';

const searchIconTestId = 'search-top-btn';
const ingredientsRadioTestId = 'ingredient-search-radio';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterRadioTestId = 'first-letter-search-radio';
const searchBtnTestId = 'exec-search-btn';

describe('search bar tests', () => {
  it('renders search bar elements correctly', () => {
    const { history } = renderWithRouter(<App />);

    const searchIcon = screen.queryByTestId(searchIconTestId);
    expect(searchIcon).not.toBeInTheDocument();

    history.push('/foods');
    const searchIconFoods = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIconFoods);

    const ingredientsRadio = screen.getByTestId(ingredientsRadioTestId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    expect(ingredientsRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});

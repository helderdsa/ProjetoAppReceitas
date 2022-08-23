import React from 'react';
import { render } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails';

describe('Login page test', () => {
  it('render elements on page', () => {
    render(<RecipeDetails />);
  });
});

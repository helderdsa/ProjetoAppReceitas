import React from 'react';
import { render } from '@testing-library/react';
import RecipeInProgress from '../pages/RecipeInProgress';

describe('Login page test', () => {
  it('render elements on page', () => {
    render(<RecipeInProgress />);
  });
});

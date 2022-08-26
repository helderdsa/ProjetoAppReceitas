import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import Login from '../pages/Login';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import renderWithRouter from './helpers/RenderWithRouter';
import store from '../redux/store';

const passwordInput = 'password-input';
const emailInput = 'email-input';
const loginSubmitButton = 'login-submit-btn';

describe('Login page test', () => {
  it('render elements on page', () => {
    render(<Login />);
    const titlePage = screen.getByText(/login/i);
    const inputPassword = screen.getByTestId(passwordInput);
    const inputEmail = screen.getByTestId(emailInput);
    const button = screen.getByTestId(loginSubmitButton);

    expect(titlePage).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('validate password and email', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(loginSubmitButton);

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'bradockgmail.com');
    userEvent.type(inputPassword, '12345');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'bradock@gmail.com');
    userEvent.type(inputPassword, '1234567');

    expect(button).not.toBeDisabled();
  });
  it('redirect to page', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(loginSubmitButton);

    userEvent.type(inputEmail, 'bradock@gmail.com');
    userEvent.type(inputPassword, '1234567');

    userEvent.click(button);

    expect(history.location.pathname).toBe('/foods');
  });
  it('test store', () => {
    render(
      <Provider store={ store }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,

    );
  });
});

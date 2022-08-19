import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from '../pages/Login';
import renderWithRouter from './helpers/RenderWithRouter';
import App from '../App';

describe('Login page test', () => {
    it('render elements on page', () => {
        render(<Login/>)
        const titlePage = screen.getByText(/login/i);
        const inputPassword = screen.getByTestId("password-input");
        const inputEmail = screen.getByTestId('email-input');
        const button = screen.getByTestId("login-submit-btn");

        expect(titlePage).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })
    it('validate password and email', () => {
        render(<Login />);
        const inputEmail = screen.getByTestId("email-input");
        const inputPassword = screen.getByTestId("password-input");
        const button = screen.getByTestId("login-submit-btn");

        expect(button).toBeDisabled();

        userEvent.type(inputEmail, 'bradockgmail.com')
        userEvent.type(inputPassword, "12345");

        expect(button).toBeDisabled();

        userEvent.type(inputEmail, "bradock@gmail.com");
        userEvent.type(inputPassword, "1234567");

        expect(button).not.toBeDisabled();
    })
    it('redirect to page', () => {
        const { history } = renderWithRouter(<App/>)

        const inputEmail = screen.getByTestId("email-input");
        const inputPassword = screen.getByTestId("password-input");
        const button = screen.getByTestId("login-submit-btn");

        userEvent.type(inputEmail, "bradock@gmail.com");
        userEvent.type(inputPassword, "1234567");

        userEvent.click(button);

        expect(history.location.pathname).toBe("/foods");
    })
})
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/login.css';

function Login() {
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [enabledBtn, setEnableBtn] = useState(true);
  const history = useHistory();

  const validateUser = () => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const validateEmail = emailRegex.test(emailData);
    const minDigit = 6;
    const validatePassword = passwordData.length > minDigit;
    if (validateEmail && validatePassword) {
      setEnableBtn(false);
    } else {
      setEnableBtn(true);
    }
  };

  const submitUser = () => {
    localStorage.setItem('user', JSON.stringify({ email: emailData }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }));
    history.push('/foods');
  };

  useEffect(() => {
    validateUser();
  }, [emailData, passwordData]);

  return (
    <div className="login-body">
      <div className="login-form">
        <h1>Login</h1>
        <label htmlFor="emailInput" className="login-input">
          Email
          <input
            type="email"
            id="emailInput"
            data-testid="email-input"
            value={ emailData }
            onChange={ ({ target }) => setEmailData(target.value) }
          />
        </label>
        <label htmlFor="passwordInput" className="login-input">
          Password
          <input
            type="password"
            id="passwordInput"
            data-testid="password-input"
            value={ passwordData }
            onChange={ ({ target }) => setPasswordData(target.value) }
          />
        </label>
        <button
          type="button"
          disabled={ enabledBtn }
          data-testid="login-submit-btn"
          onClick={ submitUser }
        >
          Enter
        </button>
      </div>
      <footer>Arrabiata Corporation Ⓒ 2022</footer>
    </div>
  );
}

export default Login;

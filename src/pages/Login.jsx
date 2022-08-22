import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  useEffect(() => {
    validateUser();
  }, [emailData, passwordData]);

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="emailInput">
        Email
        <input
          type="email"
          id="emailInput"
          data-testid="email-input"
          value={ emailData }
          onChange={ ({ target }) => setEmailData(target.value) }
        />
      </label>
      <label htmlFor="passwordInput">
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
  );
}

export default Login;

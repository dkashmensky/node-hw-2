import React from 'react';
import './Login.scss';

const Login = () => {
  const logIn = ev => {
    ev.preventDefault();
    const username = document.querySelector('.Login__login-input').value;
    const password = document.querySelector('.Login__password-input').value;
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    };

    if(username && password) {
      fetch('http://localhost:8080/api/login', fetchConfig)
        .then(checkStatus)
        .then(json)
        .then(putToken)
        .then(redirect)
        .catch(err => console.log(err));
    } else {
      showError('Please provide valid login and password');
    }
  }

  const putToken = jwt => {
    window.localStorage.setItem('jwt_token', jwt.jwt_token);
  }

  const goToRegister = ev => {
    ev.preventDefault();
    window.location = '/register';
  }

  const showError = errorText => {
    const errorBlock = document.querySelector('.Login__error');
    errorBlock.innerHTML = errorText;
    errorBlock.style.display = 'block'; 
  }

  const checkStatus = response => {
    if(response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else if(response.status === 401) {
      showError('Username and/or password is incorrect.');
      return Promise.reject(new Error(response.statusText));
    } else {
      showError(`Unknown error (Code: ${response.status}). Please try again.`);
      return Promise.reject(new Error(response.statusText));
    }
  }

  const redirect = () => {
    window.location = '/';
  }

  const json = response => response.json();

  return (
    <div className="Login block">
      <div className="block__wrapper">
        <form className="Login__form">
          <div className="Login__login">
            <input className="Login__login-input" type="text" placeholder="Login" />
          </div>
          <div className="Login__password">
            <input className="Login__password-input" type="password" placeholder="Password" />
          </div>
          <div className="Login__buttons">
            <button className="Login__confirm" onClick={logIn}>Log In</button>
            <button className="Login__register" onClick={goToRegister}>Sign up</button>
          </div>
          <div className="Login__error">

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
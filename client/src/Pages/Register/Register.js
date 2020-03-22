import React from 'react';
import './Register.scss';

const Login = () => {
  const register = ev => {
    ev.preventDefault();
    const fullname = document.querySelector('.Register__fullname-input').value;
    const username = document.querySelector('.Register__username-input').value;
    const password = document.querySelector('.Register__password-input').value;
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname,
        username,
        password
      })
    };

    if(username && password && fullname) {
      fetch('http://localhost:8080/api/register', fetchConfig)
        .then(checkStatus)
        .then(redirect)
        .catch(err => console.log(err));
    } else {
      showError('Please fill required fields.');
    }
  }

  const showError = errorText => {
    const errorBlock = document.querySelector('.Register__error');
    errorBlock.innerHTML = errorText;
    errorBlock.style.display = 'block'; 
  }

  const checkStatus = response => {
    if(response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else if(response.status === 409) {
      showError('Username already exists.');
      return Promise.reject(new Error(response.statusText));
    } else if(response.status === 400) {
      showError('Please fill required fields.');
      return Promise.reject(new Error(response.statusText));
    } else {
      showError(`Unknown error (Code: ${response.status}). Please try again.`);
      return Promise.reject(new Error(response.statusText));
    }
  }

  const redirect = () => {
    window.location = '/login';
  }

  const json = response => response.json();

  return (
    <div className="Register block">
      <div className="block__wrapper">
        <form className="Register__form">
          <header className="Register__header"><h1>Registration Form</h1></header>
          <div className="Register__fullname">
            <input className="Register__fullname-input" type="text" placeholder="Fullname" />
          </div>
          <div className="Register__username">
            <input className="Register__username-input" type="text" placeholder="Username" />
          </div>
          <div className="Register__password">
            <input className="Register__password-input" type="password" placeholder="Password" />
          </div>
          <div className="Register__buttons">
            <button className="Register__register" onClick={register}>Sign up</button>
          </div>
          <div className="Register__error">

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
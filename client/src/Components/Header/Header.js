import React, { useEffect, useState } from 'react';
import './Header.scss';
import HeaderTitle from '../../Components/HeaderTitle/HeaderTitle';
import HeaderUserInfo from '../../Components/HeaderUserInfo/HeaderUserInfo';

const Header = () => { 
  const [ user, setUser ] = useState([]);
  const fetchConfig = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${ window.localStorage.getItem('jwt_token') }`,
    },
  };

  const fetchUser = async () => {
    await fetch('http://localhost:8080/api/user', fetchConfig)
      .then(json)
      .then(setData)
      .catch(logError);
  }

  const json = response => response.json();
  const setData = json => setUser(json);
  const logError = err => console.log(err);

  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <div className="Header">
      <HeaderTitle />
      <HeaderUserInfo user={ user } />
    </div>
  )
}

export default Header;
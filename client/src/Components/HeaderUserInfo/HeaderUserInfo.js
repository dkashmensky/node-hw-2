import React from 'react';
import './HeaderUserInfo.scss';
import LogoutIcon from '../../Images/logout.png';

const HeaderUserInfo = ({ user }) => {
  const logout = () => {
    window.localStorage.removeItem('jwt_token');
    window.location = '/login';
  }

  return (
    <div className="HeaderUserInfo">
      <div className="HeaderUserInfo__name">
        { user.fullname }
      </div>
      <img className="HeaderUserInfo__logout" src={ LogoutIcon } alt="Logout Icon" onClick={logout} />
    </div>
  );
}

export default HeaderUserInfo;
import React, { useEffect } from 'react';
import './Home.scss';
import Header from '../../Components/Header/Header';
import Notes from '../../Components/Notes/Notes';

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Notes />
    </div>
  );
}

export default Home;
import React from 'react';
import Navbar from '../components/navbar';
import Anouncement from '../components/anouncement';

const Home = () => {
  return (
    <>
      <div className="home">
        <Navbar />
        <Anouncement/>
      </div>
    </>
  );
};

export default Home;

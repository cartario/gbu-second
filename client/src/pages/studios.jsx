import React from 'react';
import Navbar from '../components/navbar';
import Card from '../components/studioCard';

const Studios = () => {
  return (
    <>
      <Navbar />
      <div className="studios">
        <div className="container">
          <h2>Студии и секции</h2>
          <ul className="studios__list">
            <li className="studios__item">
              <Card />
            </li>
            <li className="studios__item">
              <Card />
            </li>
            <li className="studios__item">
              <Card />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Studios;

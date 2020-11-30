import React from 'react';
import Navbar from '../components/navbar';
import Card from '../components/studioCard';
import Header from '../components/header';

const Studios = () => {
  return (
    <>
      <Navbar />
      <Header title="Студии и секции"/>
      <main className="studios">      
        <div className="container">        
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
      </main>
    </>
  );
};

export default Studios;

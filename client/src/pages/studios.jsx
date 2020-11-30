import React from 'react';
import Navbar from '../components/navbar';
import Card from '../components/studioCard';
import Header from '../components/header';
import {cards} from '../data/data';


const Studios = () => {
  return (
    <>
      <Navbar />
      <Header title="Студии и секции"/>
      <main className="studios">         
        <div className="container">        
          <ul className="studios__list">
            {cards&&cards.map((card)=><li key={card.title} className="studios__item">
              <Card {...card}/>
            </li>)}
            
          </ul>
        </div>
      </main>
    </>
  );
};

export default Studios;

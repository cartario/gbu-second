import React from 'react';
import Navbar from '../components/navbar';
import Card from '../components/studioCard';
import Header from '../components/header';
import {studios} from '../data/studios-mock';

const Studios = () => {
  const studiosCopy = [...studios].filter((studio)=>!studio.isDuplicate);
  
  return (
    <>
      <Navbar />
      <Header title="Студии и секции"/>
      <main className="studios">         
        <div className="container">        
          <ul className="studios__list">
            {studiosCopy&&studiosCopy.map((card)=><li key={card.title + card.id} className="studios__item">
              <Card {...card}/>
            </li>)}
            
          </ul>
        </div>
      </main>
    </>
  );
};

export default Studios;

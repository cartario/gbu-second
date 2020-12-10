import React from 'react';
import Navbar from '../components/navbar';
import Card from '../components/studioCard';
import Header from '../components/header';
import Footer from '../components/footer.jsx';
import {studios} from '../data/studios-mock';

const SHOWING_BY_CLICK = 6;

const Studios = () => {
  const [showingCards, setShowingCards] = React.useState(6);

  const studiosCopy = [...studios].filter((studio)=>!studio.isDuplicate);

  const handleClickShowMore =()=>{
    setShowingCards((prev) => prev + SHOWING_BY_CLICK);
  }
  
  return (
    <>      
      <Header title="Студии и секции"/>
      <main className="studios">         
        <div className="container">        
          <ul className="studios__list">
            {studiosCopy&&studiosCopy.slice(0,showingCards).map((card)=><li key={card.title + card.id} className="studios__item">
              <Card {...card}/>
            </li>)}            
          </ul>
        </div>
      {showingCards<=studiosCopy.length &&
      <button className="btn events__btn" onClick={handleClickShowMore}>Показать еще</button>
      }       
      </main>
      
    </>
  );
};

export default Studios;

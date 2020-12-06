import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import SoonEventsSlider from '../components/soon-events-slider';
import {events} from '../data/events-mock';
import img01 from '../img/events/1.jpg';
import img02 from '../img/events/2.jpg';
import img03 from '../img/events/3.jpg';
import img04 from '../img/events/4.jpg';
import img05 from '../img/events/5.jpg';

const Events = () => {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <Navbar />
      <Header title="Мероприятия"/>
      <main className="events">
        {/* <SoonEventsSlider {...{filteredEvents: events, count, setCount}}/> */}

        <h2>Декабрь 2020</h2>
        <ul className="events__list">
          <li className="events__item">
            <img className="events__img" src={img01} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img02} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img03} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img04} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img05} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img01} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img02} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img03} alt="img"/>
          </li>         
          </ul>

          <h2>Ноябрь 2020</h2>
        <ul className="events__list">
          
          <li className="events__item">
            <img className="events__img" src={img04} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img05} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img01} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img02} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img03} alt="img"/>
          </li>         
          </ul>


          <h2>Октябрь 2020</h2>
        <ul className="events__list">
          
          <li className="events__item">
            <img className="events__img" src={img04} alt="img"/>
          </li>
          <li className="events__item">
            <img className="events__img" src={img05} alt="img"/>
          </li>
                  
          </ul>




      </main>
    </>
  );
};

export default Events;

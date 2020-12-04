import React from 'react';
import {Link} from 'react-router-dom';
import img from '../data/poster01.jpg';

const categories = ['Концерты','Соревнования','Открытые занятия','Акции','КДН', 'Конкурсы'];

const SoonEvents = () => {
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState(null);

  const handleClickVisible = () => {
    setVisible(!visible);
    setActive(null);
  }

  const handleClickActive = (index) => {
    setActive(index);
    setVisible(true);

    if(active!==index){
      setActive(index);
      setVisible(true)
    }
    else {
      setVisible(false);
      setActive(null)
    }  
  }

  return (
    <section className="soon-events">
      <h1>В ближайшее время:</h1>
      <ul className="soon-events__categories">
        <li className={`soon-events__categorie soon-events__categorie--close ${visible ? "" : "hidden"}`} onClick={handleClickVisible}></li>
          {categories.map((category, index)=><li key={category} 
          onClick={()=>handleClickActive(index)}
          className={`soon-events__categorie ${ active===index? "active" : ""}`}>{category}</li>)}        
      </ul>
      <div className="slider">
        <ul className="slider__list soon-events__list">
          <li className="slider__item soon-events__item">
            <div className="soon-events__img">
              <img src={img} alt="soonEvents"/>
            </div>
          </li>
        </ul>

        <div className="slider__controls">
          <div className="slider__control slider__control--left soon-events__control soon-events__control--left"></div>
          <div className="slider__control slider__control--right soon-events__control soon-events__control--right"></div>
        </div>

        <Link className="soon-events__btn btn" to="/events">Все мероприятия</Link>
      </div>

      
    </section>
   
  );
};

export default SoonEvents;

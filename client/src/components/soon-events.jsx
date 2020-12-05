import React from 'react';
import {Link} from 'react-router-dom';
import img from '../data/poster01.jpg';
import img2 from '../data/poster02.jpg';
import img3 from '../data/poster03.jpg';

// const categories = ['Концерты','Соревнования','Открытые занятия','Акции','КДН', 'Конкурсы'];

const events = [{
  id: '1q',
  title: 'Соревнования по киберспорту, посвященные Дню конституции',
  date: new Date(2020, 11,11,18,0),
  place: 'Люсиновская, 53',
  description: "description description description description description",
  posterUrl: img,
  category: 'концерт'
},
{
  id: '2sq',
  title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
  date: new Date(2020, 11,13,19,0),
  place: 'Люсиновская, 54',
  description: "description description desc",
  posterUrl: img2,
  category: 'акция'
},
{
  id: '2aq',
  title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
  date: new Date(2020, 11,13,19,0),
  place: 'Люсиновская, 54',
  description: "description description desc",
  posterUrl: img2,
  category: 'акция'
},
{
  id: '3q',
  title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
  date: new Date(2020, 11,13,19,0),
  place: 'Люсиновская, 54',
  description: "description description desc description description desc",
  posterUrl: null,
  category: 'кдн'
},
{
  id: '4q',
  title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
  date: new Date(2020, 11,13,19,0),
  place: 'Люсиновская, 54',
  description: "description description desc description description desc",
  posterUrl: img3,
  category: 'концерт2'
}];

const SoonEvents = () => {
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const [categories, setCategories] = React.useState(null);
  const [filteredEvents, setFilteredEvents] = React.useState([]);

  React.useEffect(()=>{
    //TODO fetch events;    
    setCategories([...new Set(events.map((event)=>event.category))]);
    setFilteredEvents(events);
  }, []);

  const handleClickVisible = () => {
    setVisible(!visible);    
    setActive(null);
    
    if(visible){
      setFilteredEvents(events);
    }
  }

  const handleClickActive = (index, category) => {
    setCount(0);    
    setFilteredEvents(events.filter((event)=>event.category===category));     

    setActive(index);
    setVisible(true);    

    if(active!==index){
      setActive(index);
      setVisible(true);      
    }
    else {
      setVisible(false);
      setActive(null);
      setFilteredEvents(events)
    }    
  }

  const handlePlus = () => {    
    if(count < filteredEvents.length - 1){
      setCount((prev)=>prev + 1);
    }
    else{
      setCount(0)
    }
  }

  const handleMinus = () => {    
    if(count <= 0){
      setCount(filteredEvents.length);
    }
    setCount((prev)=>prev - 1);
  }
  
  return (
    <section className="soon-events">
      <h1>В ближайшее время:</h1>

      {categories&&
      <ul className="soon-events__categories">
        <li className={`soon-events__categorie soon-events__categorie--close ${visible ? "" : "hidden"}`} onClick={handleClickVisible}></li>
          {categories&&categories.map((category, index)=><li key={category} 
          onClick={()=>handleClickActive(index, category)}
          className={`soon-events__categorie ${ active===index? "active" : ""}`}>{category}</li>)}        
      </ul>
    }

      <div className="slider">
        <ul className="slider__list soon-events__list">
        
          {filteredEvents&&filteredEvents.map((event, index)=>
          <li key={event.id} className={`slider__item soon-events__item ${count===index ? "visible" : ""}`}>
            <div className="soon-events__img">
              {event.posterUrl ? <img src={event.posterUrl} alt="soonEvents"/> :
              <div className="soon-events__noimg">                
                <time>{event.date.toLocaleString()}</time>
                <h3>{event.title}</h3>
                <p>{event.place}</p>
                <p>Категория: {event.category}</p>
              </div>
              }
            </div>
          </li>)}         
        </ul>        

        <div className="slider__controls">
          <div onClick={handleMinus} className="slider__control slider__control--left soon-events__control soon-events__control--left"></div>
          <div onClick={handlePlus} className="slider__control slider__control--right soon-events__control soon-events__control--right"></div>
        </div>
        
      </div>

      <div>
          <p>Описание:</p>
          {filteredEvents.map((event, index)=><p key={event.id}>
            
              {count===index? event.description : ""}
            </p>)}
        </div>
        <Link className="soon-events__btn btn" to="/events">Все мероприятия</Link>
    </section>
   
  );
};

export default SoonEvents;

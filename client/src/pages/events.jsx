import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import SoonEventsSlider from '../components/soon-events-slider';
import { events } from '../data/events-mock';
import emptyImg from '../data/card01.jpg';

const EventsByMonth = ({ events, title, setEvent, setVisible, visible, handleEventClick }) => {


  return (
    <>
      <h2>{title}</h2>
      <ul className="events__list">
        {events &&
          events.map((event) => (
            <li key={event.id} className="events__item" onClick={() => handleEventClick(event)}>
              <img className="events__img" src={event.posterUrl || emptyImg} alt={event.title} />
              {event.posterUrl ? '' : <span>{event.title.substr(0, 7)}...</span>}
            </li>
          ))}
      </ul>
    </>
  );
};

const Events = () => {
  const [count, setCount] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [event, setEvent] = React.useState(null);
  const popupRef = React.useRef();

  const handleEventClick = (event) => {
    setEvent(event);
    setVisible(true);
  };

  const handleEscKeyDown = (e) => {
    const isEsc = e.keyCode === 27;    
    if(visible&&isEsc){
      setVisible(false)
    }
  }

  const handleClickOutPopup = (e) => {
    const isOutside = !e.path.includes(popupRef.current);
    if(visible&&isOutside){      
      setVisible(false);
    }
  }

  React.useEffect(()=>{
    if(visible){
      document.body.setAttribute('style', "overflow:hidden")
    }
    else{
      document.body.setAttribute('style', "overflow:scroll")
    }

    document.addEventListener('keydown', handleEscKeyDown);
    document.addEventListener('click', handleClickOutPopup);
    
    return function (){
      document.removeEventListener('keydown', handleEscKeyDown);
      document.removeEventListener('click', handleClickOutPopup);
    }    
  })

  return (
    <>
      <Navbar />
      <Header title="Мероприятия" />
      <main className="events">
        {/* <SoonEventsSlider {...{filteredEvents: events, count, setCount}}/> */}

        <EventsByMonth
          title={'Декабрь 2020'}
          events={events.slice(0, 3)}
          setEvent={setEvent}
          setVisible={setVisible}
          visible={visible}
          handleEventClick={handleEventClick}
        />
        <EventsByMonth
          title={'Ноябрь 2020'}
          events={events.slice(0, 6)}
          setEvent={setEvent}
          setVisible={setVisible}
          visible={visible}
          handleEventClick={handleEventClick}
        />
        <EventsByMonth
          title={'Октябрь 2020'}
          events={events.slice(2, 7)}
          setEvent={setEvent}
          setVisible={setVisible}
          visible={visible}
          handleEventClick={handleEventClick}
        />

        {visible && (
          <div className="popup">
            <div ref= {popupRef} className="popup__inner">
              <h4>{event && event.title}</h4>
              <p>{event.description}</p>
              <div className="events__popup-info">
                
                <span>{event.place} </span>
                <span>{event.category} </span>
                <span>{event.date.toLocaleString()} </span>
              </div>
              <img className="events__poster" src={event.posterUrl || emptyImg} alt="imgPoster" />              

              {new Date() < event.date ? (
                ''
              ) : (
                <div className="events__old">
                  <h4>Как это было:</h4>
                  <img src={event.photos[1]} alt="img" />
                  <img src={event.photos[0]} alt="img" />{' '}
                </div>
              )}

              <div className="popup__close" onClick={() => setVisible(false)}>
                +
              </div>
            </div>
          </div>
        )}

        <button className="btn events__btn">Показать еще</button>
      </main>
    </>
  );
};

export default Events;

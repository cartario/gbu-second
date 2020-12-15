import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import SoonEventsCategories from '../components/soon-events-categories';
import SoonEventsSlider from '../components/soon-events-slider';
import useHttp from '../hooks/http.hook';

const adapterEvents = (events) => {
  return events.map((event)=> {
    const date = new Date(event.date)
    return {...event, date}
  });
};

const getCurrentEvents = (events) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  
  return events
  .filter((event)=>event.date.getFullYear()===currentYear&&event.date.getMonth()===currentMonth)
  .sort((a,b)=>b.date - a.date);
}

const SoonEvents = () => {
  const {request} = useHttp(); 
  const [count, setCount] = React.useState(0);
  const [filteredEvents, setFilteredEvents] = React.useState([]);
  const [visibleDescription, setVisibleDescription] = React.useState(false);
  const [currentEvents, setCurrentEvents] = React.useState([]);
  const [events, setEvents] = React.useState(null);

  const getEvents = useCallback(async ()=>{
    try {
      const response = await request(`/api/events`);

      setEvents(adapterEvents(response));      
      setFilteredEvents(getCurrentEvents(adapterEvents(response))); 
      setCurrentEvents(getCurrentEvents(adapterEvents(response)))
    }
    catch(err){}
  },[request]);  

  React.useEffect(()=>{    
    getEvents();    
  }, [getEvents]);

  const handleClickDescription = () => {
    setVisibleDescription(!visibleDescription);
  };

  if(!events){
    return null;
  }

const categories = [...new Set(currentEvents.map((event) => event.category))];

//TODO fix slider data

  return (
    <section className="soon-events">
      <h1>В этом месяце:</h1>

      {currentEvents && currentEvents.length ? (
        <>
          {categories && (
            <SoonEventsCategories
              events={currentEvents}
              categories={categories}
              setFilteredEvents={setFilteredEvents}
              setCount={setCount}
            />
          )}

          <SoonEventsSlider filteredEvents={filteredEvents} setCount={setCount} count={count} />

          <div className="soon-events__description">
            <p onClick={handleClickDescription}>              
              {<span className={`soon-events__description-btn ${!visibleDescription && "hide"}`}>
                {visibleDescription ? "Скрыть описание" : "Развернуть описание"}
              </span>}
            </p>
            <div className={visibleDescription ? '' : 'hidden'}>
              {filteredEvents.map((event, index) => (
                <p key={event._id}>{count === index ? event.description : ''}</p>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>В этом месяце все...</p>
      )}

      <Link className="soon-events__btn btn" to="/events"> 
        Все мероприятия
      </Link>
    </section>
  );
};

export default SoonEvents;

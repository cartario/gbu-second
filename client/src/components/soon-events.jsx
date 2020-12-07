import React from 'react';
import { Link } from 'react-router-dom';
import SoonEventsCategories from '../components/soon-events-categories';
import SoonEventsSlider from '../components/soon-events-slider';
import {events} from '../data/events-mock';

const SoonEvents = () => {
  const [count, setCount] = React.useState(0);
  const [categories, setCategories] = React.useState(null);
  const [filteredEvents, setFilteredEvents] = React.useState([]);
  const [visibleDescription, setVisibleDescription] = React.useState(false);
  const [currentEvents, setCurrentEvents] = React.useState([]);

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  React.useEffect(() => {
    //TODO fetch events;
    const currentEvents = events.filter((event)=>event.date.getFullYear()===currentYear&&event.date.getMonth()===currentMonth);
    setCategories([...new Set(currentEvents.map((event) => event.category))]);
    setFilteredEvents(currentEvents);
    setCurrentEvents(currentEvents);
  }, [currentMonth, currentYear]);

  const handleClickDescription = () => {
    setVisibleDescription(!visibleDescription);
  };

  return (
    <section className="soon-events">
      <h1>В ближайшее время:</h1>

      {filteredEvents && filteredEvents.length ? (
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
                <p key={event.id}>{count === index ? event.description : ''}</p>
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

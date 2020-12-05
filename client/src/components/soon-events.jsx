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

  React.useEffect(() => {
    //TODO fetch events;
    setCategories([...new Set(events.map((event) => event.category))]);
    setFilteredEvents(events);
  }, []);

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
              events={events}
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

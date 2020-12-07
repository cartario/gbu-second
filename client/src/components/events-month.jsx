import React from 'react';
import Event from './event';

const EventsListMonth = ({
  events,
  title,
  showingEvents,
  listRef
}) => {

  return (
    <>
      <h2>{title}</h2>
      <ul ref={listRef} className="events__list">
        {events
            .slice(0, showingEvents)
            .map((event) => (
              <Event key={event.id} event={event}/>
            ))}
      </ul>
    </>
  );
};

export default EventsListMonth;

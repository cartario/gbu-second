import React from 'react';
import Event from './event';

const EventsListMonth = ({
  events,
  title,
  showingEvents,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <ul className="events__list">
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

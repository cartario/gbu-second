import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Event from '../components/event';
import { events } from '../data/events-mock';
import { SHOWING_BY_CLICK, MONTH_NAMES } from '../constants';

const EventsListMonth = ({
  events,
  title,
  setEvent, 
  showingEvents,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <ul className="events__list">
        {events &&
          events
            .slice(0, showingEvents)
            .map((event) => (
              <Event key={event.id} event={event} setEvent={setEvent} />
            ))}
      </ul>
    </>
  );
};

const Events = () => {
  
  const [visible, setVisible] = React.useState(false);
  const [event, setEvent] = React.useState(null);
  
  const [showingEvents, setShowingEvents] = React.useState(3);
  const [visibleShowMore, setVisibleShowMore] = React.useState(true);

  const handleEventClick = (event) => {
    setEvent(event);
    setVisible(true);
  };

  const handleClickShowMore = () => {
    setShowingEvents((prev) => prev + SHOWING_BY_CLICK);

    if (showingEvents >= events.length - SHOWING_BY_CLICK) {
      setVisibleShowMore(false);
      setShowingEvents(events.length);
    }
  };  

  //TODO replace to Reducer
  const uniq = [
    ...new Set(
      events
        .sort((a, b) => b.date - a.date)
        .slice(0, showingEvents)
        .map((event) =>
          JSON.stringify({
            year: event.date.getFullYear(),
            month: event.date.getMonth(),
          }),
        ),
    ),
  ].map((item) => JSON.parse(item));

  const targetEvents = uniq.map((item) =>
    events.filter(
      (event) => item.year === event.date.getFullYear() && item.month === event.date.getMonth(),
    ),
  );

  return (
    <>
      <Navbar />
      <Header title="Мероприятия" />

      <main className="events">
        {targetEvents&&targetEvents.map((events) => (
          <EventsListMonth
            key={events[0].id}
            title={`${MONTH_NAMES[events[0].date.getMonth()]} ${events[0].date.getFullYear()}`}
            events={events}
            setEvent={setEvent}
            setVisible={setVisible}
            visible={visible}
            handleEventClick={handleEventClick}
            showingEvents={showingEvents}
          />
        ))}        

        {visibleShowMore && events.length ? (
          <button className="btn events__btn" onClick={handleClickShowMore}>
            Показать еще
          </button>
        ) : (
          ''
        )}
        {events.length ? '' : <p>Кажется мероприятия закончились...</p>}
      </main>
    </>
  );
};

export default Events;

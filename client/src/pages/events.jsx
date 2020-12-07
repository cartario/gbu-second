import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer.jsx';
import EventsListMonth from '../components/events-month';
import { events } from '../data/events-mock';
import { SHOWING_BY_CLICK, MONTH_NAMES } from '../constants';

const Events = () => {
  const [showingEvents, setShowingEvents] = React.useState(3);
  const [visibleShowMore, setVisibleShowMore] = React.useState(true);
  const listRef = React.useRef();

  const handleClickShowMore = () => {
    setShowingEvents((prev) => prev + SHOWING_BY_CLICK);
    listRef.current.scroll(1000,0);    
  };

  //TODO replace to Reducer
  //TODO fix showmore btn
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

 React.useEffect(()=>{
  if (showingEvents >= events.length - SHOWING_BY_CLICK) {
    setVisibleShowMore(false);
    setShowingEvents(events.length);
  }
 },[showingEvents])

  return (
    <>
     
      <Header title="Мероприятия" />
      <main className="events">
        {targetEvents &&
          targetEvents.map((events) => (
            <EventsListMonth
              key={events[0].id}
              title={`${MONTH_NAMES[events[0].date.getMonth()]} ${events[0].date.getFullYear()}`}
              events={events}
              showingEvents={showingEvents} 
              listRef={listRef}             
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

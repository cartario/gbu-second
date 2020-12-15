import React, { useCallback } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import EventsListMonth from '../components/events-month';
import { SHOWING_BY_CLICK, MONTH_NAMES } from '../constants';
import useHttp from '../hooks/http.hook';

const Events = () => {
  const { request } = useHttp();
  const [showingEvents, setShowingEvents] = React.useState(3);
  const [visibleShowMore, setVisibleShowMore] = React.useState(true);
  const listRef = React.useRef();
  const [events, setEvents] = React.useState(null);

  const getEvents = useCallback(async () => {
    try {
      const response = await request(`/api/events`);
      setEvents(
        response.map((event) => {
          const date = new Date(event.date);
          return { ...event, date };
        }),
      );
    } catch (err) {}
  }, [request]);

  React.useEffect(() => {
    getEvents();
  }, [getEvents]);

  //TODO replace to Reducer
  //TODO fix showmore btn

  if (!events) {
    return (<>
      <Navbar />
      <Header title="Мероприятия" />
      <h1>...Loading...</h1>
      </>);
  }

  const handleClickShowMore = () => {
    //fix  8
    if (showingEvents >= (events.length - 8)) {
      setVisibleShowMore(false);
      setShowingEvents(events.length);
    }

    else {
      setShowingEvents((prev) => prev + SHOWING_BY_CLICK);
    listRef.current.scroll(1000, 0);
    }
  };

  // console.log(showingEvents, events.length)

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
        {targetEvents &&
          targetEvents.map((events) => (
            <EventsListMonth
              key={events[0]._id}
              title={`${MONTH_NAMES[events[0].date.getMonth()]} ${events[0].date.getFullYear()}`}
              events={events}
              showingEvents={showingEvents}
              listRef={listRef}
            />
          ))}

        {visibleShowMore ? (
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

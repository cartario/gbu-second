import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import EventsPopup from '../components/events-popup';
import { events } from '../data/events-mock';
import emptyImg from '../data/card01.jpg';
import { SHOWING_BY_CLICK, MONTH_NAMES } from '../constants';

const Event = ({ event, handleEventClick }) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <li key={event.id} className="events__item" onClick={() => handleEventClick(event)}>
      {isLoading ? (
        <img
          className="events__loading"
          src="https://bayramix.ru/local/templates/bayramix_new/images/load.gif"
          alt="loader"
        />
      ) : (
        <img className="events__img" src={event.posterUrl || emptyImg} alt={event.title} />
      )}
      {event.posterUrl ? '' : <span>{event.title.substr(0, 7)}...</span>}
    </li>
  );
};

const EventsList = ({
  events,
  title,
  setEvent,
  setVisible,
  visible,
  handleEventClick,
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
              <Event key={event.id} event={event} handleEventClick={handleEventClick} />
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
  const [showingEvents, setShowingEvents] = React.useState(3);
  const [visibleShowMore, setVisibleShowMore] = React.useState(true);

  const handleEventClick = (event) => {
    setEvent(event);
    setVisible(true);
  };

  const handleEscKeyDown = (e) => {
    const isEsc = e.keyCode === 27;
    if (visible && isEsc) {
      setVisible(false);
    }
  };

  const handleClickOutPopup = (e) => {
    const isOutside = !e.path.includes(popupRef.current);
    if (visible && isOutside) {
      setVisible(false);
    }
  };

  const handleClickShowMore = () => {
    setShowingEvents((prev) => prev + SHOWING_BY_CLICK);

    if (showingEvents >= events.length - SHOWING_BY_CLICK) {
      setVisibleShowMore(false);
      setShowingEvents(events.length);
    }
  };

  React.useEffect(() => {
    if (visible) {
      document.body.setAttribute('style', 'overflow:hidden');
    } else {
      document.body.setAttribute('style', 'overflow:scroll');
    }

    document.addEventListener('keydown', handleEscKeyDown);
    document.addEventListener('click', handleClickOutPopup);

    return function () {
      document.removeEventListener('keydown', handleEscKeyDown);
      document.removeEventListener('click', handleClickOutPopup);
    };
  });

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
        {targetEvents.map((events) => (
          <EventsList
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

        {visible && <EventsPopup event={event} popupRef={popupRef} setVisible={setVisible} />}

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

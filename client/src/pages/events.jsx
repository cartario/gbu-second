import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { events } from '../data/events-mock';
import emptyImg from '../data/card01.jpg';

const SHOWING_BY_CLICK = 1;

const MONTH_NAMES = [
  'ЯНВАРЬ',
  'ФЕВРАЛЬ',
  'МАРТ',
  'АПРЕЛЬ',
  'МАЙ',
  'ИЮНЬ',
  'ИЮЛЬ',
  'АВГУСТ',
  'СЕНТЯБРЬ',
  'ОКТЯБРЬ',
  'НОЯБРЬ',
  'ДЕКАБРЬ',
];

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

const EventsByMonth = ({
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
  const [showingEvents, setShowingEvents] = React.useState(1);
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
          <EventsByMonth
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

        {visible && (
          <div className="popup">
            <div className="popup__top">
              <div ref={popupRef} className="popup__inner">
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
          </div>
        )}

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

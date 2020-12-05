import React from 'react';
import { Link } from 'react-router-dom';
import img from '../data/poster01.jpg';
import img2 from '../data/poster02.jpg';
import img3 from '../data/poster03.jpg';
import SoonEventsCategories from '../components/soon-events-categories';
import SoonEventsSlider from '../components/soon-events-slider';

const events = [
  {
    id: '1q',
    title: 'Соревнования по киберспорту, посвященные Дню конституции',
    date: new Date(2020, 11, 11, 18, 0),
    place: 'Люсиновская, 53',
    description: 'description description description description description',
    posterUrl: img,
    category: 'концерт',
  },
  {
    id: '2sq',
    title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
    date: new Date(2020, 11, 13, 19, 0),
    place: 'Люсиновская, 54',
    description: 'description description desc',
    posterUrl: img2,
    category: 'акция',
  },
  {
    id: '2aq',
    title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
    date: new Date(2020, 11, 13, 19, 0),
    place: 'Люсиновская, 54',
    description: 'description description desc',
    posterUrl: img2,
    category: 'акция',
  },
  {
    id: '3q',
    title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
    date: new Date(2020, 11, 13, 19, 0),
    place: 'Люсиновская, 54',
    description: 'description description desc description description desc',
    posterUrl: null,
    category: 'кдн',
  },
  {
    id: '4q',
    title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
    date: new Date(2020, 11, 13, 19, 0),
    place: 'Люсиновская, 54',
    description: 'description description desc description description desc',
    posterUrl: img3,
    category: 'концерт2',
  },
];

const SoonEvents = () => {
  const [count, setCount] = React.useState(0);
  const [categories, setCategories] = React.useState(null);
  const [filteredEvents, setFilteredEvents] = React.useState([]);

  React.useEffect(() => {
    //TODO fetch events;
    setCategories([...new Set(events.map((event) => event.category))]);
    setFilteredEvents(events);
  }, []);

  return (
    <section className="soon-events">
      <h1>В ближайшее время:</h1>

      {filteredEvents&&filteredEvents.length ? (
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

          <div>
            <p>Описание:</p>
            {filteredEvents.map((event, index) => (
              <p key={event.id}>{count === index ? event.description : ''}</p>
            ))}
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

import React from 'react';

const SoonEventsSlider = ({filteredEvents, count, setCount}) => {
  const handleSlider = (e) => {
    const target = e.target.className;

    if (target.includes('right')) {
      count >= filteredEvents.length - 1 ? setCount(0) : setCount((prev) => prev + 1);
    } else {
      count <= 0 ? setCount(filteredEvents.length - 1) : setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="slider">
        <ul className="slider__list soon-events__list">
          {filteredEvents &&
            filteredEvents.map((event, index) => (
              <li
                key={event.id}
                className={`slider__item soon-events__item ${count === index ? 'visible' : ''}`}
              >
                <div className="soon-events__img">
                  {event.posterUrl ? (
                    <img src={event.posterUrl} alt="soonEvents" />
                  ) : (
                    <div className="soon-events__noimg">
                      <time>{event.date.toLocaleString()}</time>
                      <h3>{event.title}</h3>
                      <p>{event.place}</p>
                      <p>Категория: {event.category}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>

        <div className="slider__controls">
          <div
            onClick={handleSlider}
            className="slider__control slider__control--left soon-events__control soon-events__control--left"
          ></div>
          <div
            onClick={handleSlider}
            className="slider__control slider__control--right soon-events__control soon-events__control--right"
          ></div>
        </div>
      </div>
  );
};

export default SoonEventsSlider;

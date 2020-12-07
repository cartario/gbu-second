import React from 'react';
import emptyImg from '../data/card01.jpg';

const EventsPopup = ({ event , visible, setVisible}) => {
  const popupRef = React.useRef();

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

  return (
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
              <img src={event.photos && event.photos[1]} alt="img" />
              <img src={event.photos && event.photos[0]} alt="img" />{' '}
            </div>
          )}

          <div className="popup__close" onClick={() => setVisible(false)}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPopup;

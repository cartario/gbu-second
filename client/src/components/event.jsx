import React from 'react';
import emptyImg from '../data/card01.jpg';
import EventsPopup from './events-popup';

const Event = ({event}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [visiblePopup, setVisiblePopup] = React.useState(false);

  const handleEventClick = () => {    
    setVisiblePopup(true);
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);

  React.useEffect(()=>{
    if (visiblePopup) {
      document.body.setAttribute('style', 'overflow:hidden');
    } else {
      document.body.setAttribute('style', 'overflow:scroll');
    }
  });

  return (
    <>
      {visiblePopup && (
        <EventsPopup event={event} setVisible={setVisiblePopup} visible={visiblePopup} />
      )}
      <li key={event.id} className="events__item" onClick={handleEventClick}>
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
    </>
  );
};

export default Event;

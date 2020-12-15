import React from 'react';
import SessionTodayAddress from '../components/sessions-today-addres';
// import { studios } from '../data/studios-mock';
import { sayWelcome } from '../utils';

const HOLIDAY = 0;
const day = (new Date()).getDay();

const SessionsTodayBoard = ({studios}) => {
  const [todayCards, setTodayCards] = React.useState(null);
  const dayStatus = sayWelcome();

  React.useEffect(() => {
    //TODO fetch cards
    const todayCards = studios.filter((card) => {
      if (!card.day) {
        return null;
      }
      return card.day.includes(day);
    });

    setTodayCards(todayCards);
  }, []);

  if (!todayCards) {
    return null;
  }

  const addreses = [...new Set(todayCards.map((card) => card.adress).sort(() => -1))];
  //todo replace to reduce, get Lusin of the list by first priority

  return (
    <section className="now">
      <div>
        {day === HOLIDAY ? (
          <h3 className="now__holiday">
            Сегодня выходной и занятия закончилиь. Однако до понедельника вы можете присмотреть себе{' '}
            <a href="/studios">студию/секцию</a> по душе и записаться онлайн
          </h3>
        ) : (
          ''
        )}
      </div>
      {todayCards.length && dayStatus.status !== 0 ? (
        <div className="sessions">
          <h3>Занятия на сегодня:</h3>
          {addreses.map((addres) => (
            <SessionTodayAddress
              key={addres}
              dataList={todayCards.filter((card) => card.adress === addres)}              
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </section>
  );
};

export default SessionsTodayBoard;

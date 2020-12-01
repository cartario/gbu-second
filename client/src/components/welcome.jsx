import React from 'react';
import { useHistory } from 'react-router-dom';
import { sayWelcome } from '../utils';
import { cards } from '../data/data';

const WelcomeBlock = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/schedule');
  };

  const date = new Date();
  const day = date.getDay();

  const todayCards = cards.filter((card) => {
    if (!card.repeatDays) {
      return;
    }
    return card.repeatDays.includes(day);
  });

  return (
    <>
      <section className="welcome">
        <div className="welcome__overlay overlay">
          <div className="row">
            <div className="col col-75">
              <p>Центр досуга "Даниил"</p>
              <h1>Развивайся и отдыхай вместе с нами!</h1>
              <h4>Москва - ЮАО - Даниловский район</h4>
            </div>
          </div>

          <div className="row">
            <div className="col col-50">
              <button onClick={handleClick} className="btn">
                Проверить расписание
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="now">
        <h2>{sayWelcome()}</h2>
        {!todayCards.length ? (
          <h3>
            Сегодня выходной и занятия закончилиь. Однако вы можете присмотреть себе{' '}
            <a href="/studios">студию/секцию</a> по душе
          </h3>
        ) : (
          ''
        )}
        {todayCards.length ? <h3>Сегодня проходят занятия:</h3> : ''}
        {todayCards &&
          todayCards.map((card) => (
            <p key={card.id}>
              <a href={`/detail/${card.id}`}>{card.title}</a>
            </p>
          ))}
        {/* <h3>Также в скором времени у нас появятся мероприятия</h3> */}
        {/* <h3>Совсем скоро у нас состоится концерт! Подробности в анонсе</h3> */}
      </section>
    </>
  );
};

export default WelcomeBlock;

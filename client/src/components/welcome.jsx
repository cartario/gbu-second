import React from 'react';
import { useHistory } from 'react-router-dom';
import { sayWelcome } from '../utils';
import { cards } from '../data/data';
import { studios } from '../data/studios-mock';
import classNames from 'classnames';


const WelcomeBlock = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/schedule');
  };

  const date = new Date();
  const day = date.getDay();

  const welcome = sayWelcome();


  const todayCards = studios.filter((card) => {
    if (!card.day) {
      return;
    }
    return card.day.includes(day);
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
        <div className={classNames({
          "now__welcome" : true,
          "now__welcome--morning": welcome.status===1,
          "now__welcome--day": welcome.status===2,
          "now__welcome--evening": welcome.status===3,
          "now__welcome--night": welcome.status===0,
        })}>          
          <h2><span>{welcome.name}</span></h2>
        </div>       
        
        {!todayCards.length ? (
          <h3>
            Сегодня выходной и занятия закончилиь. Однако вы можете присмотреть себе{' '}
            <a href="/studios">студию/секцию</a> по душе
          </h3>
        ) : (
          ''
        )}
        {todayCards.length && welcome.status!==0 ? <h3>Занятия на сегодня:</h3> : ''}

        {todayCards &&welcome.status!==0 &&
          todayCards.map((card) => (
            <p key={card.id}>
              <a href={`/detail/${card.id}`}>{card.title}</a><span> начало в {card.timeFrom}</span>
            </p>
          ))}


        {/* <h3>Также в скором времени у нас появятся мероприятия</h3> */}
        {/* <h3>Совсем скоро у нас состоится концерт! Подробности в анонсе</h3> */}
      </section>
    </>
  );
};

export default WelcomeBlock;

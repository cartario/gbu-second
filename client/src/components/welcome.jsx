import React from 'react';
import { useHistory } from 'react-router-dom';
import { sayWelcome } from '../utils';
import { studios } from '../data/studios-mock';
import classNames from 'classnames';

const HOLIDAY = 6;

const WelcomeBlock = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/schedule');
  };

  const date = new Date();
  const day = date.getDay();

  const welcome = sayWelcome();
  const sportStudiosCount = studios.filter(
    (studio) => !studio.isDuplicate && studio.type === 'sport',
  ).length;
  const artStudiosCount = studios.filter((studio) => !studio.isDuplicate && studio.type !== 'sport')
    .length;

  const todayCards = studios.filter((card) => {
    if (!card.day) {
      return null;
    }
    return card.day.includes(day);
  });

  const trofimovaSessionsToday = todayCards.filter((card) => card.adress === 'Трофимова 9, корп.2');
  const lusinovaSessionsToday = todayCards.filter((card) => card.adress === 'Люсиновская, 53');

  const handleClickItem = (id) => {
    history.push(`/detail/${id}`);
  }

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
        <div
          className={classNames({
            now__welcome: true,
            'now__welcome--morning': welcome.status === 1,
            'now__welcome--day': welcome.status === 2,
            'now__welcome--evening': welcome.status === 3,
            'now__welcome--night': welcome.status === 0,
          })}
        >
          <h2>
            <span>{welcome.name}</span>
          </h2>
        </div>
        <div className="now__total">
          <h3>В нашем центре:</h3>
          <p className="now__total-sport">
            <span>{sportStudiosCount}</span> спортивных направлений
          </p>
          <p className="now__total-art">
            <span>{artStudiosCount}</span> творческих направлений
          </p>
          <p className="now__total-instructors">
            <span>{17}</span>тренеров и преподавателей
          </p>
        </div>

        {day===HOLIDAY ? (
            <h3>
              Сегодня выходной и занятия закончилиь. Однако вы можете присмотреть себе{' '}
              <a href="/studios">студию/секцию</a> по душе
            </h3>
          ) : (
            ''
          )}
            
          {todayCards.length && welcome.status !== 0 ? 
          <div className="sessions">     
          <h3>Занятия на сегодня:</h3> 
          <h4 className="sessions__address">Люсиновская, 53 :</h4>
          <ul>
            {lusinovaSessionsToday &&              
              lusinovaSessionsToday.map((card) => (
                <li key={card.id} className="sessions__item" onClick={()=>handleClickItem(card.id)}>
                 <p>{card.title}
                    <span> начало в {card.timeFrom}</span>
                  </p> 
                </li>
              ))}
          </ul>
          <h4 className="sessions__address sessions__address--trofimova">Трофимова 9, корп.2 :</h4>
          <ul>
            {trofimovaSessionsToday &&              
              trofimovaSessionsToday.map((card) => (
                <li key={card.id} className="sessions__item" onClick={()=>handleClickItem(card.id)}>
                  <p>{card.title}
                    <span> начало в {card.timeFrom}</span>
                  </p>                  
                </li>
              ))}
          </ul>
          </div>
          :          
          ''}         

          {/* <h3>Также в скором времени у нас появятся мероприятия</h3> */}
          {/* <h3>Совсем скоро у нас состоится концерт! Подробности в анонсе</h3> */}
        
      </section>
    </>
  );
};

export default WelcomeBlock;

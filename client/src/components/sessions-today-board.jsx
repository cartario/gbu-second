import React from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { studios } from '../data/studios-mock';
import { sayWelcome } from '../utils';

const HOLIDAY = 6;

const SessionsTodayBoard = () => {
  const history = useHistory();
  const dayStatus = sayWelcome();

  const handleClickItem = (id) => {
    history.push(`/detail/${id}`);
  };

  const date = new Date();
  const day = date.getDay();
  const currentHour = date.getHours(); 

  const todayCards = studios.filter((card) => {
    if (!card.day) {
      return null;
    }
    return card.day.includes(day);
  });

  const trofimovaSessionsToday = todayCards.filter((card) => card.adress === 'Трофимова 9, корп.2');
  const lusinovaSessionsToday = todayCards.filter((card) => card.adress === 'Люсиновская, 53');

  return (
    <section className="now">
        <div>
          {day===HOLIDAY ? (
            <h3>
              Сегодня выходной и занятия закончилиь. Однако вы можете присмотреть себе{' '}
              <a href="/studios">студию/секцию</a> по душе
            </h3>
          ) : (
            ''
          )}
        </div>
            
          {todayCards.length && dayStatus.status !== 10 ? 
          <div className="sessions">     
          <h3>Занятия на сегодня:</h3> 
          <h4 className="sessions__address">Люсиновская, 53 :</h4>
          <ul>
            {lusinovaSessionsToday &&              
              lusinovaSessionsToday.map((card) => (
                <li key={card.id} 
                
                className={classNames({
                  "sessions__item": true,
                  "sessions__item--active": currentHour>=card.timeFrom.split(':')[0]&&currentHour<card.timeTo.split(':')[0]
                })}
                
                onClick={()=>handleClickItem(card.id)}>
                 <p>{card.name}
              <span> начало в {card.timeFrom}</span>
                  </p> 
                </li>
              ))}
          </ul>
          <h4 className="sessions__address sessions__address--trofimova">Трофимова 9, корп.2 :</h4>
          <ul>
            {trofimovaSessionsToday &&              
              trofimovaSessionsToday.map((card) => (
                <li key={card.id} 

                className={classNames({
                  "sessions__item": true,
                  "sessions__item--active": currentHour>=card.timeFrom.split(':')[0]&&currentHour<card.timeTo.split(':')[0]
                })}
                
                onClick={()=>handleClickItem(card.id)}>
                  <p>{card.name}
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
  );
};

export default SessionsTodayBoard;

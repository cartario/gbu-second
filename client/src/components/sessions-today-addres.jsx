import React from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

const currentHour = (new Date()).getHours();

const SessionTodayAddress = ({ dataList}) => {
  
  const history = useHistory();
  const handleClickItem = (id) => {
    history.push(`/detail/${id}`);
  };
  return (
    <>
      {dataList.length ? (
        <h4 className="sessions__address sessions__address--trofimova">{dataList[0].adress} :</h4>
      ) : (
        ''
      )}
      <ul>
        {dataList &&
          dataList.map((card) => (
            <li
              key={card._id}
              className={classNames({
                sessions__item: true,
                'sessions__item--active':
                  currentHour >= card.timeFrom.split(':')[0] &&
                  currentHour < card.timeTo.split(':')[0],
              })}
              onClick={() => handleClickItem(card._id)}
            >
              <p>
                {card.name}
                <span> начало в {card.timeFrom}</span>
              </p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SessionTodayAddress;

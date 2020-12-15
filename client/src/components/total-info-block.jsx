import React from 'react';
// import { studios } from '../data/studios-mock';

const TotalInfoBlock = ({studios}) => {

  const sportStudiosCount = studios.filter(
    (studio) => !studio.isDuplicate && studio.type === 'sport',
  ).length;
  const artStudiosCount = studios.filter((studio) => !studio.isDuplicate && studio.type !== 'sport')
    .length;

  const instructorsCount = [...new Set(studios.map((studio) => !studio.isDuplicate&&studio.teacher))].length;

  return (
    <div className="totalInfoBlock">
    <h3>В нашем центре:</h3>
    <p className="totalInfoBlock-sport">
      <span>{sportStudiosCount}</span> спортивных секций
    </p>
    <p className="totalInfoBlock-art">
      <span>{artStudiosCount}</span> творческих студий
    </p>
    <p className="totalInfoBlock-instructors">
      <span>{instructorsCount}</span>тренеров и преподавателей
    </p>
  </div>
  );
};

export default TotalInfoBlock;

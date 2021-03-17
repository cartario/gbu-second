import React from 'react';
// import { studios } from '../data/studios-mock';

const TotalInfoBlock = ({studios}) => {
  const [data, setData] = React.useState();

  const sportStudiosCount = studios.filter(
    (studio) => !studio.isDuplicate && studio.type === 'sport',
  ).length;
  const artStudiosCount = studios.filter((studio) => !studio.isDuplicate && studio.type !== 'sport')
    .length;

  const instructorsCount = [...new Set(studios.map((studio) => !studio.isDuplicate&&studio.teacher))].length;

  React.useEffect(()=>{
    const fetchData = async() => {
      const response = await fetch('https://centerdaniil-b74b6-default-rtdb.firebaseio.com/mainPage/totalCount/-MVyiJLub00dIoC5KR0X.json')
      const data = await response.json();
      setData(data)
    }

    fetchData();
  }, []);

  if(!data){
    return (<>
    <div className="totalInfoBlock">
      <h3>В нашем центре:</h3>
      <p>Loading...</p>
    </div>
    </>)
  }
  
  const {budgetArt, budgetSport, budgetTeachers, platkaArt, platkaSport, platkaTeachers} = data;  

  return (
    <div className="totalInfoBlock">
    <h3>В нашем центре:</h3>

    <p className="totalInfoBlock-art">
      {/* <span>{artStudiosCount}</span> творческих студий */}
      <span>{Number(budgetArt) + Number(platkaArt)}</span> творческих секций {Number(platkaArt) ? `(платных-${platkaArt})` : ''}
    </p>

    <p className="totalInfoBlock-sport">
      {/* <span>{sportStudiosCount}</span> спортивных секций */} 
      <span>{Number(budgetSport) + Number(platkaSport)}</span> спортивных секций {Number(platkaSport) ? `(платных-${platkaSport})` : ''}
    </p>    

    <p className="totalInfoBlock-instructors">
      {/* <span>{instructorsCount}</span>тренеров и преподавателей */}
      <span>{Number(budgetTeachers) + Number(platkaTeachers)}</span>тренеров и преподавателей
    </p>
  </div>
  );
};

export default TotalInfoBlock;

import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { adapterPage2 as adapter } from '../utils';

const PageJoin = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page-join.json',
        );
        const resData = await response.json();
        const adaptedData = adapter(resData);
        setData(adaptedData);
      } catch (err) {
        throw err;
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <>
        <Navbar activeItem="page-join" />
        <Header title="Загрузка..." />
        <p>Loading...</p>
      </>
    );
  }

  const { info, items } = data;

  return (
    <>
      <Navbar activeItem="page-join" />
      <Header title={info.pageName} />
      <main className="contacts">
        <h2 style={{textAlign: 'center'}}>Перечень документов необходимых для записи в студии/секции ГБУ ЦД Даниил</h2>
        <ul className="contacts__team">
         
          {items.map((item) => (
            <li className="contacts__team-item" key={item.id}>
              <p className="contacts__team-name" style={{fontWeight: 'bold'}}>{item.title}</p>
              
              <p>{item.description}</p>

              <a href={item.imgUrl} download>Скачать документы для заполнения</a>

            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default PageJoin;

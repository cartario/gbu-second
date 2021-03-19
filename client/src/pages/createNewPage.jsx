import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { adapterPage2 as adapter } from '../utils';

const CreateNewPage = ({path}) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://centerdaniil-b74b6-default-rtdb.firebaseio.com/${path}.json`,
        );
        const resData = await response.json();
        const adaptedData = adapter(resData);
        setData(adaptedData);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, []); 

  if (!data) {
    return (
      <>
        <Navbar activeItem={path} />
        <Header title="Загрузка..." />
        <p>Loading...</p>
      </>
    );
  }

  const { info, items } = data;

  return (
    <>
      <Navbar activeItem={path} />
      <Header title={info.pageName} />
      <main className="contacts">
        <ul className="contacts__team">
        {items.map((item) => (
            <li className="contacts__team-item" key={item.id}>
              <img
                src={item.imgUrl}
                alt="photoItem"
              />
              <p className="contacts__team-name">{item.title}</p>

              <p className="contacts__team-description">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default CreateNewPage;

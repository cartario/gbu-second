import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { adapterPage2 as adapter } from '../utils';

const Page3 = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page3.json',
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
        <Navbar activeItem="page3" />
        <Header title="Города воинской славы" />
        <p>Loading...</p>
      </>
    );
  }

  const { info, items } = data;

  return (
    <>
      <Navbar activeItem="page3" />
      <Header title={info.pageName} />
      <main className="contacts">
        <ul className="contacts__team">
          {items.map((item) => (
            <li className="contacts__team-item" key={item.id}>
              <p className="contacts__team-name">{item.title}</p>
              <iframe
                width="560"
                height="315"
                src={item.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Page3;

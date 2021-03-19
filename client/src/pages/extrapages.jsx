import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { Link, useHistory } from 'react-router-dom';
import { adapterCreatePage as adapter } from '../utils';

const items = [
  {
    title: 'Московское долголетие',
    url: '/page1',
    backgroundColor: '#3fb2bf',
    visible: true
  },
  {
    title: 'Лента памяти',
    url: '/page2',
    backgroundColor: 'orange',
    visible: true
  },
  {
    title: 'Города воинской славы',
    url: '/page3',
    backgroundColor: 'grey',
    visible: true
  },
];

const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/';

const Extrapages = () => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pages.json`);

        const resData = await response.json();

        const adaptedData = adapter(resData);

        setData(adaptedData);
      } catch (err) {
        setData({});
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <>
        <Navbar />
        <Header title="Дополнительно" />
        <main className="contacts">
          <ul className="contacts__team">
            <p>Loading...</p>
          </ul>
        </main>
      </>
    );
  }

  const newAdaptedData = data.items ? data.items.map((each)=>{
    return {
      id: each.id,
      title: each.pageName,
      url: `/${each.pagePath}`,
      backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),    
      visible: each.visible ==='true' || each.visible === true ? true : false
    }
  }) : [];

  return (
    <>
      <Navbar />
      <Header title="Дополнительно" />
      <main className="contacts">
        <ul className="contacts__team">
          {[...items,...newAdaptedData].filter((each)=>each.visible).map((item) => (
            <li
              key={item.url}
              className="contacts__team-item"
              style={{ border: 'none', marginTop: '40px' }}
            >
              <Link
                to={item.url}
                className="contacts__team-name"
                style={{
                  backgroundColor: item.backgroundColor,
                  padding: '20px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#fff',
                }}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Extrapages;

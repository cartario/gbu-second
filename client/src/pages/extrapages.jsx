import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { Link, useHistory } from 'react-router-dom';

const items = [
  {
    title: 'Московское долголетие',
    url: '/page1',
    backgroundColor: '#3fb2bf',
  },
  {
    title: 'Лента памяти',
    url: '/page2',
    backgroundColor: 'orange',
  },
  {
    title: 'Города воинской славы',
    url: '/page3',
    backgroundColor: 'grey',
  },
];

const Extrapages = () => {
  return (
    <>
      <Navbar />
      <Header title="Дополнительно" />
      <main className="contacts">
        <ul className="contacts__team">
          {items.map((item) => (
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

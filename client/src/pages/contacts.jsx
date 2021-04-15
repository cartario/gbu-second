import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { adapterContactPage as adapter } from '../utils';

const Contacts = () => {
  const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/';
  const [data, setData] = React.useState();

  const obj = {
    pageName: 'New page',
    pagePath: 'page4',
    visible: true,
  };

  const handleSubmit = async () => {
    await fetch(`${BASE_URL}pages.json`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/contactPage.json`);
        const data = await response.json();

        const adaptedData = adapter(data);

        setData(adaptedData);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <>
        <Navbar />
        <Header title="Контакты" />
        <main className="contacts">
          <ul className="contacts__team">
            <p>Loading...</p>
          </ul>
        </main>
      </>
    );
  }

  const { members, contacts, social } = data.items;

  return (
    <>
      

      <Navbar />
      <Header title="Контакты" />
      <main className="contacts">
        <button onClick={handleSubmit}>send</button>
        <ul className="contacts__team">
          {members.map((member) => (
            <li className="contacts__team-item" key={member.name}>
              <img src={member.imgUrl} alt="photoTeam" />
              <p className="contacts__team-name">{member.name}</p>
              <p className="contacts__team-position">{member.position}</p>
              <p className="contacts__team-description">{member.description}</p>
            </li>
          ))}
        </ul>
        <div className="contacts__info">
          <h4>Мы всегда на связи:</h4>
          <div className="contacts__block">
            <p className="contacts__addres">Адрес: улица Люсиновская, дом 53 — основное здание,</p>
            <p className="contacts__phone">
              Телефон:
              <span>{contacts.phone1}, {contacts.phone2}</span>
            </p>
            <p className="contacts__admin">Администратор: {contacts.adminName1} </p>
          </div>

          <div className="contacts__block">
            <p className="contacts__addres">
              Адрес: улица Трофимова, дом 9 корпус 2 — Клуб «Браво»
            </p>
            <p className="contacts__phone">
              Телефон:
              <span>{contacts.phone3}, {contacts.phone4}</span>
            </p>
            <p className="contacts__admin">
              {contacts.adminPosition}: {contacts.adminName2}
            </p>
          </div>

          <div className="contacts__block">
            <p>E-mail: daniil_2007@mail.ru </p>
            <p>
              Зеркало: <a href="http://xn--80ahcoasjcyt5b.xn--p1ai/">ЦЕНТРДАНИИЛ.РФ</a>
            </p>

            {social.map((item) => (
              <p key={item.url}>
                <a href={item.url}>{item.title}</a>
              </p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Contacts;

import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import {adapterContactPage as adapter} from '../utils';

const Contacts = () => {
  const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/';
  const [data, setData] = React.useState();

  // const obj =   {
  //   adminName1: 'Семяник Наталья Мирославовна',
  //   adminName2: 'Тикот Анна Николаевна',
  //   phone1: '+7(499) 237-90-40',
  //   phone2: '+7-903-253-07-73',
  //   phone3: '+7(495)679-92-93',
  //   phone4: '+7(965)336-06-83' 
  // }

  // const handleSubmit = async () => {
  //   await fetch(`${BASE_URL}contactPage/items/contacts.json`, {
  //     mode: 'no-cors',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(obj)
  //   })
  // }

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

  console.log(contacts)

  return (
    <>
      <Navbar />
      <Header title="Контакты" />
      <main className="contacts">
        
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
              Руководитель структурного подразделения: {contacts.adminName2}
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

//моки
// const items = {
//   members: [
//     {
//       name: 'Фадеева Инна Генадьевна',
//       position: 'Директор ГБУ ЦД «Даниил»',
//       description:
//         'Опыт работы руководителем 15 лет Образование: Московский психолого-педагогический университет Опыт работы: Муниципальный депутат 7-го созыва в Районе Чертаново-Центральное Ведёт работу по патриотическому воспитанию молодежи Награждена медалью «Почетный работник народного образования»',
//       imgUrl:
//         'https://res.cloudinary.com/dxioiveim/image/upload/v1608015313/team/%D0%98%D0%93_hixyjv.jpg',
//     },

//     {
//       name: 'Ременников Михаил Юрьевич',
//       position: 'Заместитель директора ГБУ ЦД «Даниил»',
//       description:
//         'Образование: Закончил Московский государственный лингвистический университет, по специальности информационная безопасность. Повышение квалификации в области профессиональной коммуникации в сфере информационной безопасности на английском и немецких языках.Московский Педагогический Государственный  университет по специальности международная мультимедийная журналистика.Опыт работы: За 5 лет работы в государственной   сфере  принимал участие и курировал проекты Префектуры ЮАО.  Ведет работу по позиционированию деятельности центра и  освещению работы.Активно участвует в жизни района Даниловский.',
//       imgUrl:
//         'https://res.cloudinary.com/dxioiveim/image/upload/v1608015312/team/%D0%9C%D0%B8%D1%88%D0%B0-576x1024_j5tbec.jpg',
//     },

//     {
//       name: 'Зикевская Анастасия Викторовна',
//       position: 'Начальник отдела по досуговой работе',
//       description:
//         'Образование: окончила с красным диплом Липецкий Государственный университет по специальности: специальный психолог, психологическое консультирование и психо-коррекция, педагогика и психология семейных отношений. Опыт работы: 8 лет. Финалист конкурса 2015г. «Сердце отдаю детям» Ведет работу по обучению детей и взрослых танцам брейк-данс, помогает подросткам состоящим на учете КДНиЗП найти свою жизненную цель и определить дальнейшие шаги по ее достижению.',
//       imgUrl:
//         'https://res.cloudinary.com/dxioiveim/image/upload/v1608015309/team/%D0%9D%D0%B0%D1%81%D1%82%D1%8F-683x1024_fftwun.jpg',
//     },

//     {
//       name: 'Левштанов Дмитрий Николаевич',
//       position: 'Заместитель директора ГБУ ЦД «Даниил»',
//       description:
//         'Образование  — высшее, окончил в 2008 году Московский Городской Педагогический Университет, в 2013  Московский Институт Открытого Образования по специальности «Физическая Культура», «Безопасность Жизнедеятельности». Квалификация по диплому —  учитель Безопасности Жизнедеятельности, учитель Физической Культуры. В 2009 году окончил курсы повышения квалификации МГПИ «Молодой учитель в современной школе, аспекты профессиональной деятельности». Педагогический стаж с 2007 года. Награждён грамотами: 2008 г.- от Департамента образования города Москвы «За организацию на высоком уровне физкультурно-оздоровительной работы с учащимися, результативную подготовку учащихся к спортивным соревнованиям», 2012 г. – от Департамента образования города Москвы «За успехи в деле обучения и воспитания подрастающего поколения», 2012г. – от Муниципалитета внутригородского муниципального образования Даниловское «За большой вклад в развитии физкультурно-оздоровительной и спортивной работы на территории внутригородского муниципального образования Даниловское в городе Москве и за активное участие в организации и проведении спортивных мероприятий в 2012 году».',
//       imgUrl:
//         'https://res.cloudinary.com/dxioiveim/image/upload/v1608015306/team/Levshtanov_gxy5fj.jpg',
//     },

//     {
//       name: 'Тикот Анна Николаевна',
//       position: 'Руководитель структурного подразделения (Трофимова)',
//       description:
//         'Образование: высшее. Педагогический стаж: 16 лет.Имеется опыт работы руководителем: 7 лет, заведующая детским садом. Награждена грамотой Департамента образования за вклад в развитие образования (2017 г.) Финалист окружного этапа конкурса «Педагог-психолог года» 2010г.',
//       imgUrl:
//         'https://res.cloudinary.com/dxioiveim/image/upload/v1608015302/team/%D0%90%D0%BD%D0%BD%D0%B0-%D0%93%D0%BB%D0%B0%D0%B7%D0%BA%D0%BE%D0%B2%D0%B0-1-200x300_pyvpgd.jpg',
//     },
//   ],

//     social: [
//       {
//         title: 'Вконтакте',
//         url: 'https://vk.com/centerdaniil',
//       },
//       {
//         title: 'Интсаграм',
//         url: 'https://www.instagram.com/centerdaniil/',
//       },
//       {
//         title: 'Youtube',
//         url: 'https://www.youtube.com/channel/UCysktd_Jfz233rxvmfz1F2w',
//       },
//     ],
//   },
// };

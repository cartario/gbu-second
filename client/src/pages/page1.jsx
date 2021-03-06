import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import { adapterPage1 as adapter } from '../utils';

const Page1 = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page1.json',
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
        <Navbar activeItem="page1" />
        <Header title="Московское долголетие" />
        <p>Loading...</p>
      </>
    );
  }

  const { title, studios, projects, teachers, afisha } = data;

  return (
    <>
      <Navbar activeItem="page1" />
      <Header title="Московское долголетие" />
      <main className="contacts">
        <ul className="contacts__team">
          <li className="contacts__team-item">
            <p className="contacts__team-name" style={{ fontWeight: 'bold' }}>
              {title.title}
            </p>

            <p className="contacts__team-position" style={{ backgroundColor: 'orange' }}>
              На сегодняшний день открыты следующие студии и секции:
            </p>

            {studios.map((studio) => (
              <p className="contacts__team-description" key={studio.id}>
                <b>{studio.title}</b> - {studio.description}
              </p>
            ))}

            <p className="contacts__team-position" style={{ backgroundColor: 'yellow' }}>
              Планируется к открытию:
            </p>

            {projects.map((project) => (
              <p className="contacts__team-description" key={project.id}>
                <b>{project.title}</b> - {project.description}
              </p>
            ))}

            <p className="contacts__team-position" style={{ backgroundColor: 'tomato' }}>
              Преподавательский состав
            </p>

            {teachers.map((teacher) => (
              <p className="contacts__team-description" key={teacher.id}>
                <b>{teacher.subj}</b> - {teacher.name}
              </p>
            ))}
          </li>
        </ul>

        <div style={{ minWidth: '320px', margin: '0 auto' }}>
          <img src={afisha} width="100%" height="auto" alt="afisha" />
        </div>

      </main>
    </>
  );
};

export default Page1;

//моки
// const items = {
//   title: 'ПЕРЕЧЕНЬ   ЗАНЯТИЙ по МОСКОВСКОМУ ДОЛГОЛЕТИЮ В ГБУ ЦД  «ДАНИИЛ»  в 2021г.',
//   studios: [
//     {
//       title: 'Интеллектуальный клуб ( ландшафтный дизайн)',
//       description:
//         '(объем проведения занятий, в период с 01.04.2020г. по 15.12.2020г.) занятия будут проводиться 2 раза в неделю, продолжительность 1 часа, 1 группа 15 человек. ',
//     },
//     {
//       title: 'Экскурсионные программы (Экскурс в историю) ',
//       description:
//         '(объем проведения занятий, в период с 01.04.2020г. по 15.12.2020г.) занятия будут проводиться 2 раза в неделю, продолжительность 2 часа, 1 группа 15 человек. ',
//     },
//   ],

//   projects: [
//     {
//       title: 'Английский язык / иные языки',
//       description:
//         '(объем проведения занятий, в период с   01.04.2020 г. по 15.12.2020 г.) занятия будут проводиться 2 раза в неделю, продолжительностью 1час, 1 группа 15 человек.',
//     },
//     {
//       title: 'Общая физическая подготовка ',
//       description:
//         ' (объем проведения занятий, в период с 01.04.2020г. по 15.12.2020г.) занятия будут проводиться 2 раза в неделю, продолжительность 1 час, 1 группа 15 человек. ',
//     },

//     {
//       title: 'Художественно-прикладное творчество',
//       description:
//         '(объем проведения занятий, в период с 01.04.2020г. по 15.12.2020г.) занятия будут проводиться 2 раза в неделю, продолжительность 2 часа, 1 группа 15 человек. ',
//     },

//     {
//       title: 'Пение ( современная/ фольклорная песня) ',
//       description:
//         ' (объем проведения занятий, в период с 01.04.2020г. по 15.12.2020г.) занятия будут проводиться 2 раза в неделю, продолжительность 2 часа, 2 группы 30 человек. ',
//     },

//     {
//       title: 'Шахматы и шашки',
//       description:
//         '(объем проведения занятий, в период с 01.04.2020г. по 15.12.2020г.) занятия будут проводиться 2 раза в неделю, продолжительность 1 часа, 1 группа 15 человек. ',
//     },

//     {
//       title: 'Танцы',
//       description:
//         '(объем проведения занятий, в период с 01.04.2020г. по 15.12.2020г.) занятия будут проводиться 2 раза в неделю, продолжительность 1 часа, 2 группы 20 человек. ',
//     },

//     {
//       title: 'Рисование',
//       description:
//         '(объем проведения занятий, в период с 01.04.2020г. по 15.12.2020г.) занятия будут проводиться 2 раза в неделю, продолжительность 2 часа, 1 группа 10 человек. ',
//     },
//   ],

//   teachers: [
//     {
//       subj: 'ОФП',
//       name: ' Сай Глеб Дмитриевич'
//     },

//     {
//       subj: 'Английский язык/ другие языки',
//       name: ' Голубев Кирилл Александрович'
//     },

//     {
//       subj: 'Художественно-прикладное творчество',
//       name: 'Павлова Ирина Юрьевна'
//     },

//     {
//       subj: 'Пение (современная песня) ',
//       name: 'Фатеева Ольга Владимировна'
//     },

//     {
//       subj: 'Пение(фольклорная песня)',
//       name: 'Фатеева Ольга Владимировна'
//     },

//     {
//       subj: 'Шахматы и шашки ',
//       name: 'Лапехин Александр Викторович'
//     },

//     {
//       subj: 'Танцы',
//       name: 'Балаенков Александр Викторович'
//     },

//     {
//       subj: 'Рисование',
//       name: 'Хайрудинов Анвар Рифгатович'
//     },

//     {
//       subj: 'Интеллектуальный клуб (ландшафтный дизайн)',
//       name: 'Тикот Анна Николаевна'
//     },

//     {
//       subj: 'Экскурсионные программы',
//       name: 'Цветцых Илья Эдуардович'
//     },

//   ]
// };

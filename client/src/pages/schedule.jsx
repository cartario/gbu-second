import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import CCF_000090 from '../uploads/2020/11/CCF_000090.pdf';
import CCF_000062 from '../uploads/2020/10/CCF_000062.pdf';
import CCF_000058 from '../uploads/2020/09/CCF_000058.pdf';
import CCF_000052 from '../uploads/2020/09/CCF_000052.pdf';
import CCF_000027 from '../uploads/2020/08/CCF_000027.pdf';
import CCF_000027z from '../uploads/2020/07/07sch.pdf';
import CCF_000028z from '../uploads/2020/06/sch06.docx';

const schedules = [
  {
    title: 'Расписание на ноябрь 2020 (дистанционный режим)',
    link: CCF_000090,
  },
  {
    title: 'Расписание на октябрь 2020 (дистанционный режим)',
    link: CCF_000062,
  },
  {
    title: 'Расписание платных секций на 2020',
    link: CCF_000058,
  },
  {
    title: 'Расписание на сентябрь 2020',
    link: CCF_000052,
  },
  {
    title: 'Расписание на август 2020',
    link: CCF_000027,
  },
  {
    title: 'Расписание на июль 2020',
    link: CCF_000027z,
  },
  {
    title: 'Расписание на июнь 2020',
    link: CCF_000028z,
  },
];

const Schedule = () => {
  return (
    <>
      <Navbar />
      <Header title="Расписание" />
      <main className="schedule">       
        <ul className="schedule__list">
          {schedules &&
            schedules.map((doc) => (
              <li key={doc.title} className="schedule__item">
                <a href={doc.link}>{doc.title}</a>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
};

export default Schedule;

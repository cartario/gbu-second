import React from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import CCF_000090 from '../uploads/2020/11/CCF_000090.pdf';
import CCF_000062 from '../uploads/2020/10/CCF_000062.pdf';
import CCF_000058 from '../uploads/2020/09/CCF_000058.pdf';
import CCF_000052 from '../uploads/2020/09/CCF_000052.pdf';
import CCF_000027 from '../uploads/2020/08/CCF_000027.pdf';
import CCF_000027z from '../uploads/2020/07/07sch.pdf';
import CCF_000028z from '../uploads/2020/06/sch06.docx';
import CCF_000112 from '../uploads/2020/11/CCF_000112.pdf';
import non20events from '../uploads/2020/11/ноя.png';
import oct20events from '../uploads/2020/11/окт.png';
import dec20events from '../uploads/2020/11/дек.jpg';
import useHttp from '../hooks/http.hook';

const schedules = [
  {
    title: 'Расписание на декабрь 2020 (дистанционный режим) - Скачать',
    link: CCF_000112,
  },
  {
    title: 'Расписание мероприятий на декабрь 2020 (дистанционный режим) - Скачать',
    link: dec20events,
    afisha: true
  },
  {
    title: 'Расписание на ноябрь 2020 (дистанционный режим) - Скачать',
    link: CCF_000090,
  },
  {
    title: 'Расписание мероприятий на ноябрь 2020 (дистанционный режим) - Скачать',
    link: non20events,
    afisha: true
  },
  {
    title: 'Расписание на октябрь 2020 (дистанционный режим) - Скачать',
    link: CCF_000062,
  },
  {
    title: 'Расписание мероприятий на октябрь 2020 - Скачать',
    link: oct20events,
    afisha: true
  },
  {
    title: 'Расписание платных секций на 2020 - Скачать',
    link: CCF_000058,
  },
  {
    title: 'Расписание на сентябрь 2020 - Скачать',
    link: CCF_000052,
  },
  {
    title: 'Расписание на август 2020 - Скачать',
    link: CCF_000027,
  },
  {
    title: 'Расписание на июль 2020 - Скачать',
    link: CCF_000027z,
  },
  {
    title: 'Расписание на июнь 2020 - Скачать',
    link: CCF_000028z,
  },
].filter((item)=>item.afisha);

const Schedule = () => {
  const { request, loading, error, clearError } = useHttp();
  const [docs, setDocs] = React.useState(null);

  const getDocs = React.useCallback(async ()=>{
    try {
      const response = await request(`/api/docs`);     
      setDocs(response.filter((item)=>item.afisha))
    }
    catch(err){}
  },[request]);

  React.useEffect(()=>{    
    getDocs();
    
  }, [getDocs]);

  if(!docs){
    return (<h1>Loading...</h1>)
  }

  docs.sort((b,a)=>new Date(a.createdAt)-new Date(b.createdAt));

  const adapterDocs = docs.map((doc)=>({
    title:doc.title,
    link:doc.url
  }))
  
  return (
    <>
      <Navbar/>
      <Header title="Афиша" />
      <main className="schedule">      
        <ul className="schedule__list">
          {schedules &&
            [...adapterDocs, ...schedules].map((doc) => (
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

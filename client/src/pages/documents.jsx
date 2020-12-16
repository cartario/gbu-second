import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import CCF_000026 from '../uploads/2020/08/CCF_000026.pdf';
import CCF_000027z from '../uploads/2019/11/Антикоррупционная-политика.pdf';
import CCF_000028z from '../uploads/2019/11/Кодекс-этики-сотрудников.pdf';
import CCF_000029z from '../uploads/2020/08/Налоговое-свидетельство.pdf';
import CCF_000030z from '../uploads/2020/08/План-мероприятий-по-противодействию-коррупции.pdf';
import CCF_000031z from '../uploads/2019/11/Положение-о-деятельности-отдела-по-организации-спортивной-работы.pdf';
import CCF_000032z from '../uploads/2020/12/011-Положение-об-оплате-труда-1.pdf';
import CCF_000033z from '../uploads/2020/12/012-Положение-о-платных-услуг.pdf';

const documents = [
  {
    title: 'Скачать - Административный регламент',
    link: CCF_000026,
  },
  {
    title: 'Скачать - Антикоррупционная политика',
    link: CCF_000027z,
  },
  {
    title: 'Скачать - Кодекс этики сотрудников',
    link: CCF_000028z,
  },
  {
    title: 'Скачать - Налоговое свидетельство',
    link: CCF_000029z,
  },
  {
    title: 'Скачать - План мероприятий по противодействию коррупции',
    link: CCF_000030z,
  },
  {
    title: 'Скачать - Положение о деятельности отдела по организации спортивной работы',
    link: CCF_000031z,
  },
  {
    title: 'Скачать - Положение о деятельности по организации досуговой работы',
    link: "https://cloud.mail.ru/public/kjFx/56d1KpDoS",
  },
  {
    title: 'Скачать - Положение о защите персональных данных работников',
    link: "https://cloud.mail.ru/public/4onm/23pVuVnn6",
  },
  {
    title: 'Скачать - Положение о конфликте интересов',
    link: "https://cloud.mail.ru/public/JGHF/UPQu9hLYg",
  },
  {
    title: 'Скачать - Положение о предоставлении гос. услуги',
    link: "https://cloud.mail.ru/public/4wat/1WKEFwhuL",
  },
  {
    title: 'Скачать - Положение о структурных подразделениях',
    link: "https://cloud.mail.ru/public/2bqR/4SMKU6FUD",
  },
  {
    title: 'Скачать - Правила внутреннего распорядка',
    link: "https://cloud.mail.ru/public/wdCe/57xKCdx51",
  },
  {
    title: 'Скачать - Устав ГБУ ЦД «Даниил»',
    link: "https://cloud.mail.ru/public/4H5h/4zTkcfMoi",
  },
  {
    title: 'Скачать - Порядок перевода работников на дистанционную работу из-за Covid-19',
    link: "https://cloud.mail.ru/public/49Df/4Qia2y6Ud",
  },
  {
    title: 'Скачать - Порядок осуществления контроля качества оказываемых услуг в ГБУ ЦД «Даниил»',
    link: "https://cloud.mail.ru/public/4bfJ/5DrSb48ip",
  },
  {
    title: 'Скачать - Положение о внутреннем контроле ГБУ ЦД «Даниил»',
    link: "https://cloud.mail.ru/public/6aTa/3hffh2wBc",
  },
  {
    title: 'Скачать - Положение об оплате труда',
    link: CCF_000032z,
  },
  {
    title: 'Скачать - Положение о платных услугах',
    link: CCF_000033z,
  },
];

const Documents = () => {
  return (
    <>
      <Navbar/>     
      <Header title="Документы" />
      <main className="documents">
        <ul className="documents__list">
          {documents &&
            documents.map((doc) => (
              <li key={doc.title} className="documents__item">
                <a href={doc.link}>{doc.title}</a>
              </li>
            ))}
        </ul>
      </main>
      
    </>
  );
};

export default Documents;

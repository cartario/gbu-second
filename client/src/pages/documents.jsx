import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer.jsx';
import CCF_000026 from '../uploads/2020/08/CCF_000026.pdf';
import CCF_000027z from '../uploads/2019/11/Антикоррупционная-политика.pdf';
import CCF_000028z from '../uploads/2019/11/Кодекс-этики-сотрудников.pdf';
import CCF_000029z from '../uploads/2020/08/Налоговое-свидетельство.pdf';
import CCF_000030z from '../uploads/2020/08/План-мероприятий-по-противодействию-коррупции.pdf';
import CCF_000031z from '../uploads/2019/11/Положение-о-деятельности-отдела-по-организации-спортивной-работы.pdf';

const documents = [
  {
    title: 'Административный регламент',
    link: CCF_000026,
  },
  {
    title: 'Антикоррупционная политика',
    link: CCF_000027z,
  },
  {
    title: 'Кодекс этики сотрудников',
    link: CCF_000028z,
  },
  {
    title: 'Налоговое свидетельство',
    link: CCF_000029z,
  },
  {
    title: 'План мероприятий по противодействию коррупции',
    link: CCF_000030z,
  },
  {
    title: 'Положение о деятельности отдела по организации спортивной работы',
    link: CCF_000031z,
  },
];

const Documents = () => {
  return (
    <>
      <Navbar />
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
      <Footer/>
    </>
  );
};

export default Documents;

//         работы Положение о деятельности по организации досуговой работы Положение о защите
//         персональных данных работников Положение о конфликте интересов Положение о предоставлении
//         гос. услуги Положение о структурных подразделениях Правила внутреннего распорядка Устав ГБУ
//         ЦД “Даниил” Порядок перевода работников на дистанционную работу из-за Covid-19 Порядок
//         осуществления контроля качества оказываемых услуг в ГБУ ЦД “Даниил” Положение о внутреннем
//         контроле ГБУ ЦД “Даниил” Положение об оплате труда Положение о платных услугах

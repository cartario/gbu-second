import img01 from '../img/events/1.jpg';
import img02 from '../img/events/2.jpg';
import img03 from '../img/events/3.jpg';
import img04 from '../img/events/4.jpg';
import img05 from '../img/events/5.jpg';
import img06 from '../data/poster01.jpg';
import img07 from '../data/poster02.jpg';
import img08 from '../data/poster03.jpg';

export const events = [
  {
    id: '1q',
    title: 'Соревнования по киберспорту, посвященные Дню конституции',
    date: new Date(2019, 11, 11, 18, 0),
    place: 'Люсиновская, 53',
    description: 'description description description description description',
    posterUrl: img01,
    category: 'концерт',
    photos: [img01, img02, img03],
  },
  {
    id: '2sq',
    title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
    date: new Date(2020, 11, 13, 19, 0),
    place: 'Люсиновская, 54',
    description: 'description description desc',
    posterUrl: img02,
    category: 'акция',
    photos: [img01, img02, img03],
  },
  {
    id: '2aq',
    title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
    date: new Date(2020, 11, 13, 19, 0),
    place: 'Люсиновская, 54',
    description: 'description description desc',
    posterUrl: img03,
    category: 'акция',
    photos: [img01, img02, img03],
  },
  {
    id: '3q',
    title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
    date: new Date(2020, 11, 13, 19, 0),
    place: 'Люсиновская, 54',
    description: 'description description desc description description desc',
    posterUrl: null,
    category: 'кдн',
    photos: [img01, img02, img03],
  },
  {
    id: '4q',
    title: 'Соревнования по киберспорту, посвященные Дню конституции 2',
    date: new Date(2020, 11, 13, 19, 0),
    place: 'Люсиновская, 54',
    description: 'description description desc description description desc',
    posterUrl: img04,
    category: 'концерт2',
    photos: [img01, img02, img03],
  },
];
import breakingCard from './breaking_card.jpg';
import theaterCard from './theater_card.jpg';
import guitarCard from './guitar_card.svg';
import artCard from './art_card.jpg';
import voiceCard from './voice_card.jpeg';
import chessCard from './chess_card.jpg';

//0-sunday, 1-monday etc.
export const cards = [
  {
    id: 1,
    title: 'Break dance',
    description: "Брейк-данс - динамичный танец. Здесь главное - уметь чувствовать ритм. Исполнителей называют “b-boy” или ”b-girl”, как сокращение от break-boy - танцор ломаного бита. На занятиях дети учатся импровизировать и мыслить творчески, развивают гибкость, музыкальность и чувство стиля",
    cardUrl: breakingCard,
    price: 'free',
    type: 'dance',
    timeFrom: '19:30',
    timeTo: '21:00',
    repeatDays: [2, 4]
  },
  {
    id: 2,
    title: 'Театр юного актера',
    description: "Все для  юных звездочек: Актерское мастерство Сценречь/ Логопед Пластика / Ритмика",
    cardUrl: theaterCard,
    price: 'free',
    type: 'play',
    timeFrom: 6,
    timeTo: 10,
    repeatDays: []
  },
  {
    id: 3,
    title: 'Студия акустической гитары',
    description: "Акустическая гитара - это одним из наиболее популярных музыкальных инструментов. Для акустики написано множество красивых мелодий и песен. Желание научиться играть на гитаре абсолютно понятно и закономерно.",
    cardUrl: guitarCard,
    price: 'free',
    type: 'music',
    timeFrom: '18:00',
    timeTo: '20:30',
    repeatDays: [2,5]
  },
  {
    id: 4,
    title: 'Студия изобразительного искусства "Акварелька"',
    description: "В студиях изобразительного искусства изучают графику, живопись, станковую и декоративную композиции. Студии дают возможность попробовать свои силы в разных направлениях классического и прикладного творчества: рисунок, живопись, лепка и т. д. Все предметы взаимосвязаны между собой, при этом каждый в отдельности имеет определенные задачи.",
    cardUrl: artCard,
    price: 'free',
    type: 'art',
    timeFrom: '',
    timeTo: '',
    repeatDays: []
  },
  {
    id: 5,
    title: 'Студия вокала',
    description: "В нашей студии вы почувствуете себя настоящей ⭐️звездой👍 и откроете новые возможности своего голоса❗️",
    cardUrl: voiceCard,
    price: 'free',
    type: 'music',
    timeFrom: '',
    timeTo: '',
    repeatDays: []
  },
  {
    id: 6,
    title: 'Шахматная секция "Шах и мат"',
    description: "Вы получите увлекательное хобби и новых друзей, привыкнете планировать свои поступки, порадуете близких усидчивостью и собранностью, разовьете логическое мышление и интерес к точным наукам.",
    cardUrl: "https://sun9-54.userapi.com/impf/u_lHrNxQ0q91PETuXjC8I7vrMqxkpMstNihoLg/-D1B1aQDICc.jpg?size=1200x800&quality=96&proxy=1&sign=4891b26fb464b37e59e46019f431b1eb",
    price: 'free',
    type: 'sport',
    timeFrom: '',
    timeTo: '',
    repeatDays: []
  },
];
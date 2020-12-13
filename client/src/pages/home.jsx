import React from 'react';
import Navbar from '../components/navbar';
import SoonEvents from '../components/soon-events';
import WelcomeBlock from '../components/welcome';
import SayHello from '../components/say-hello';
import TotalInfoBlock from '../components/total-info-block';
import SessionsTodayBoard from '../components/sessions-today-board';

const Home = ({events}) => {
  
  return (
    <section className="home">
      <Navbar/>
      <WelcomeBlock />
      <SayHello />      
      <TotalInfoBlock />
      <SessionsTodayBoard />
      <SoonEvents events={events}/>
    </section>
  );
};

export default Home;

import React from 'react';
import Navbar from '../components/navbar';
import SoonEvents from '../components/soon-events';
import WelcomeBlock from '../components/welcome';
import SayHello from '../components/say-hello';
import TotalInfoBlock from '../components/total-info-block';
import SessionsTodayBoard from '../components/sessions-today-board';
import Footer from '../components/footer.jsx';

const Home = ({ setActiveMenuItem }) => {
  return (
    <section className="home">
      <WelcomeBlock />
      <SayHello />      
      <TotalInfoBlock />
      <SessionsTodayBoard />
      <SoonEvents setActiveMenuItem={setActiveMenuItem} />
    </section>
  );
};

export default Home;

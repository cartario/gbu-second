import React from 'react';
import Navbar from '../components/navbar';
import Anouncement from '../components/anouncement';
import WelcomeBlock from '../components/welcome';
import Header from '../components/header';



const Home = () => {
  

  return (
    <>
      <div className="home">
        <Navbar />
        <WelcomeBlock />
        
        <Header title="Анонс"/>
        <Anouncement/>
      </div>
    </>
  );
};

export default Home;

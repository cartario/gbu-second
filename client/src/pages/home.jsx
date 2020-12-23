import React, {useCallback} from 'react';
import Navbar from '../components/navbar';
import SoonEvents from '../components/soon-events';
import WelcomeBlock from '../components/welcome';
import SayHello from '../components/say-hello';
import TotalInfoBlock from '../components/total-info-block';
import SessionsTodayBoard from '../components/sessions-today-board';
import useHttp from '../hooks/http.hook';
import Poster from '../components/main-poster';
import VideoPlayer from '../components/videoplayer';

const Home = () => {
  const {request} = useHttp();
  const [studios, setStudios] = React.useState(null);  

  const getStudios = useCallback(async ()=>{
    try {
      const response = await request(`/api/studios`);
      setStudios(response)
    }
    catch(err){}
  },[request]);  

  React.useEffect(()=>{    
    getStudios();
  }, [getStudios]);

  if(!studios){
    return (<>
    <Navbar/>
    <WelcomeBlock />
    <SayHello />
      <h1>...Loading...</h1>
    <SoonEvents />
    </>);
  }
  
  return (
    <section className="home">
      <Navbar/>
      <WelcomeBlock />
      <SayHello />  
      <VideoPlayer /> 
      <Poster />   
      <TotalInfoBlock studios={studios}/>
      <SessionsTodayBoard studios={studios}/>
      <SoonEvents />
    </section>
  );
};

export default Home;

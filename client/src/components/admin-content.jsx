import React, {useCallback} from 'react';
import AdminEventCard from '../components/admin-event-card';
import AdminEventNewCard from '../components/admin-event-newcard';
import AdminStudioCard from '../components/admin-studio';
import AdminStudioNewCard from '../components/admin-studio-newcard';
import AdminMainPost from '../components/admin-main-post';
import useHttp from '../hooks/http.hook';
import { useContext } from 'react';
import { AuthConext } from '../context/auth.context';
import ScheduleDocs from '../components/schedule-docs';

const AdminPage = () => {
  const { request, loading, error, clearError } = useHttp();
  const [events, setEvents] = React.useState(null);
  const [studios, setStudios] = React.useState(null);
  
  const auth = useContext(AuthConext);
  const [showNewEvent, setshowNewEvent] = React.useState(false);
  const [showNewStudio, setshowNewStudio] = React.useState(false);

  const handleShowNewEvent = (value) => {
    setshowNewEvent(value);
  };

  const handleShowNewStudio = (value) => {
    setshowNewStudio(value);
  };

  const getStudios = useCallback(async ()=>{
    try {
      const response = await request(`/api/studios`);
      setStudios(response)
    }
    catch(err){}
  },[request]);

  const getEvents = useCallback(async () => {
    try {
      const response = await request(`/api/events`);
      setEvents(
        response.map((event) => {
          const date = new Date(event.date);
          return { ...event, date };
        }),
      );
    } catch (err) {}
  }, [request]);

  React.useEffect(()=>{    
    getStudios();
    getEvents();
  }, [getStudios, getEvents]);

  if(!studios){
    return (<h1>Loading...</h1>)
  }

  const namesOfGroup = [... new Set(studios.map((studio)=>studio.name))];
  const studiosBynamesOfGroup = namesOfGroup.map((group)=>studios.filter((studio)=>studio.name===group));

  const StudiosByGroup = ({studios}) => {
    return (
    <ul>
      {studios.map((studio) => <AdminStudioCard key={studio._id} studio={studio} />)}
    </ul>)
  }

  return (
    <>
      <h1>AdminPage</h1>
      <nav>
        <ul>
          <li>
            <a href="/">На главную</a>
          </li>
          <li>
            {' '}
            <a href="/admin" onClick={() => auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>

      <ScheduleDocs />

      <div>
        <h2>Events</h2>

        {showNewEvent ? (
          <AdminEventNewCard handleShowNewEvent={handleShowNewEvent} />
        ) : (
          <button onClick={() => handleShowNewEvent(true)}>+</button>
        )}
        <ul>{events ?events.map((event) => <AdminEventCard setEvents={setEvents} key={event._id} event={event} />) : <p>Loading...</p>}</ul>
      </div>

      <AdminMainPost />

      <div>
        <h2>Studios</h2>

        {showNewStudio ? (
          <AdminStudioNewCard handleShowNewStudio={handleShowNewStudio} />
        ) : (
          <button onClick={() => handleShowNewStudio(true)}>+</button>
        )}
        {/* <ul>{studios ? studios.map((studio) => <AdminStudioCard key={studio._id} studio={studio} />) : <p>Loading...</p>}</ul> */}

          {studiosBynamesOfGroup.map((studios, index)=>
          <div key={index} className="admin-groups">
            <p>{index+1} Группа студий: {studios[0].name}</p>
            <StudiosByGroup studios={studios}/>
          </div>)}
        
      </div>      
    </>
  );
};

export default AdminPage;

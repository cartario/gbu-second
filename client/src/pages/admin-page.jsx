import React from 'react';
import AdminEventCard from '../components/admin-event-card';
import AdminEventNewCard from '../components/admin-event-newcard';
import AdminStudioCard from '../components/admin-studio';
import AdminStudioNewCard from '../components/admin-studio-newcard';
import useHttp from '../hooks/http.hook';
import { useContext } from 'react';
import { AuthConext } from '../context/auth.context';

const AdminPage = ({events, studios}) => {
  const { request, loading, error, clearError } = useHttp();
  
  const auth = useContext(AuthConext);
  const [showNewEvent, setshowNewEvent] = React.useState(false);
  const [showNewStudio, setshowNewStudio] = React.useState(false);

  const handleShowNewEvent = (value) => {
    setshowNewEvent(value);
  };

  const handleShowNewStudio = (value) => {
    setshowNewStudio(value);
  };

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
            <a href="/login" onClick={() => auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <h2>Events</h2>

        {showNewEvent ? (
          <AdminEventNewCard handleShowNewEvent={handleShowNewEvent} />
        ) : (
          <button onClick={() => handleShowNewEvent(true)}>+</button>
        )}
        <ul>{events&&events.map((event) => <AdminEventCard key={event._id} event={event} />)}</ul>
      </div>

      <div>
        <h2>Studios</h2>

        {showNewStudio ? (
          <AdminStudioNewCard handleShowNewStudio={handleShowNewStudio} />
        ) : (
          <button onClick={() => handleShowNewStudio(true)}>+</button>
        )}
        <ul>{studios&&studios.map((studio) => <AdminStudioCard key={studio._id} studio={studio} />)}</ul>
      </div>      
    </>
  );
};

export default AdminPage;
